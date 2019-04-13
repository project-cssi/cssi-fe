import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';

class Print extends React.Component {
  static propTypes = {
    /* Copy styles over into print window. default: true */
    copyStyles: PropTypes.bool,
    /* Content to be printed */
    content: PropTypes.func.isRequired,
    /* Callback function to trigger before print */
    onBeforePrint: PropTypes.func,
    /* Callback function to trigger after print */
    onAfterPrint: PropTypes.func,
    /* Override default print window styling */
    pageStyle: PropTypes.string,
    /* Optional class to pass to the print window body */
    bodyClass: PropTypes.string,
    /* Determines if the print preview should close after print */
    closeAfterPrint: PropTypes.bool,
  };

  static defaultProps = {
    copyStyles: true,
    closeAfterPrint: true,
    bodyClass: '',
  };

  triggerAction = (actionType) => {
    const {
      bodyClass,
      content,
      copyStyles,
      pageStyle,
      onAfterPrint,
    } = this.props;

    const contentEl = content();

    if (contentEl === undefined) {
      console.error('Refs are not available stateless components. only Class based components can be printed');
      return false;
    }

    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'absolute';
    printWindow.style.top = '-1000px';
    printWindow.style.left = '-1000px';

    const contentNodes = findDOMNode(contentEl);
    const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

    this.linkTotal = linkNodes.length || 0;
    this.linkLoaded = 0;

    const markLoaded = (type) => {
      this.linkLoaded = this.linkLoaded + 1;

      if (this.linkLoaded === this.linkTotal) {
        if (actionType === 'print') {
          this.print(printWindow);
        } else if (actionType === 'pdf') {
          this.exportPDF();
        }
      }
    };

    printWindow.onload = () => {
      /* IE11 support */
      if (window.navigator && window.navigator.userAgent.includes('Trident/7.0')) {
        printWindow.onload = null;
      }

      const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
      const srcCanvasEls = [...contentNodes.querySelectorAll('canvas')];

      domDoc.open();
      domDoc.write(contentNodes.outerHTML);
      domDoc.close();

      /* remove date/time from top */
      const defaultPageStyle = pageStyle === undefined
        ? '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }'
        : pageStyle;

      const styleEl = domDoc.createElement('style');
      styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
      domDoc.head.appendChild(styleEl);

      if (bodyClass.length) {
        domDoc.body.classList.add(bodyClass);
      }

      const canvasEls = domDoc.querySelectorAll('canvas');
      [...canvasEls].forEach((node, index) => {
        node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
      });

      if (copyStyles !== false) {
        const headEls = document.querySelectorAll('style, link[rel="stylesheet"]');

        [...headEls].forEach((node, index) => {
          const newHeadEl = domDoc.createElement(node.tagName);
          let styleCSS = '';

          if (node.tagName === 'STYLE') {
            if (node.sheet) {
              for (let i = 0; i < node.sheet.cssRules.length; i++) {
                styleCSS += `${node.sheet.cssRules[i].cssText}\r\n`;
              }

              newHeadEl.setAttribute('id', `react-to-print-${index}`);
              newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
            }
          } else {
            const attributes = [...node.attributes];
            attributes.forEach((attr) => {
              newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
            });

            newHeadEl.onload = markLoaded.bind(null, 'link');
            newHeadEl.onerror = markLoaded.bind(null, 'link');
          }

          domDoc.head.appendChild(newHeadEl);
        });
      }

      if (this.linkTotal === 0 || copyStyles === false) {
        if (actionType === 'print') {
          this.print(printWindow);
        } else if (actionType === 'pdf') {
          this.exportPDF();
        }
      }
    };

    document.body.appendChild(printWindow);
  };

  removeWindow = (target) => {
    setTimeout(() => {
      target.parentNode.removeChild(target);
    }, 500);
  };

  print = (target) => {
    const { onBeforePrint, onAfterPrint } = this.props;

    if (onBeforePrint) {
      onBeforePrint();
    }

    setTimeout(() => {
      target.contentWindow.focus();
      target.contentWindow.print();
      this.removeWindow(target);

      if (onAfterPrint) {
        onAfterPrint();
      }
    }, 500);
  };

  exportPDF = () => {
    setTimeout(() => {
      const element = document.getElementById('print-frame');
      html2pdf(element);
    }, 500);
  };

  render() {
    return (<div />);
  }
}

export default Print;
