import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {
    hidden, content, calendar, plain, wizard, customCssClass, title,
    category, textCenter, ctAllIcons, ctFullWidth, ctTextCenter,
    tableFullWidth, stats, legend, ftTextCenter,
  } = props;
  return (
    <div className={`card${
      hidden ? ' card-hidden' : ''
    }${calendar ? ' card-calendar' : ''
    }${plain ? ' card-plain' : ''
    }${wizard ? ' card-wizard' : ''
    }${customCssClass ? ` ${customCssClass}` : ''}`}
    >
      {
          (title) || (category)
            ? (
              <div className={`header${textCenter ? ' text-center' : ''}`}>
                <h4 className="title">
                  {title}
                </h4>
                <p className="category">
                  {category}
                </p>
              </div>
            )
            : ''
        }
      <div className={`content${
        ctAllIcons ? ' all-icons' : ''
      }${ctFullWidth ? ' content-full-width' : ''
      }${ctTextCenter ? ' text-center' : ''
      }${tableFullWidth ? ' table-full-width' : ''}`}
      >
        {content}
      </div>
      {
          (stats) || (legend)
            ? (
              <div className={`footer${
                ftTextCenter ? ' text-center' : ''}`}
              >
                {
                (legend)
                  ? (
                    <div className="legend">
                      {legend}
                    </div>
                  )
                  : null
              }
                {
                stats
                  ? (
                    <hr />
                  )
                  : null
              }
                {
                stats
                  ? (
                    <div className="stats">
                      {stats}
                    </div>
                  )
                  : null
              }
              </div>
            )
            : null
        }
    </div>
  );
};

Card.defaultProps = {
  hidden: false,
  content: null,
  calendar: false,
  plain: false,
  wizard: false,
  customCssClass: null,
  title: null,
  category: '',
  textCenter: false,
  ctAllIcons: false,
  ctFullWidth: false,
  ctTextCenter: false,
  ftTextCenter: false,
  tableFullWidth: false,
  stats: null,
  legend: null,
};

Card.propTypes = {
  hidden: PropTypes.bool,
  content: PropTypes.element,
  calendar: PropTypes.bool,
  plain: PropTypes.bool,
  wizard: PropTypes.bool,
  customCssClass: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  textCenter: PropTypes.bool,
  ctAllIcons: PropTypes.bool,
  ctFullWidth: PropTypes.bool,
  ctTextCenter: PropTypes.bool,
  ftTextCenter: PropTypes.bool,
  tableFullWidth: PropTypes.bool,
  stats: PropTypes.string,
  legend: PropTypes.string,
};

export default Card;
