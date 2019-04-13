import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import {
  FormGroup, ControlLabel, FormControl, InputGroup,
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Dropzone from 'react-dropzone';
import { CustomCheckbox as Checkbox, CustomSwitch as Switch } from '../elements';

const createRenderer = render => (props) => {
  const {
    input,
    type,
    label,
    required,
    placeholder,
    fieldClass,
    meta: { touched, error, warning },
    selectOptions,
    checkboxLabel,
    componentClass,
    frontAddon,
    frontAddonAction,
    backAddon,
    backAddonAction,
    disabled,
    onLabel,
    offLabel,
    children,
    fieldOptions,
  } = props;

  const fieldId = uniqid('field-');
  let controlLabel = '';
  if (label) {
    controlLabel = (
      <ControlLabel htmlFor={fieldId}>
        {label}
        {' '}
        {
          (required)
            ? (
              <span className="star">
            *
              </span>
            )
            : null
        }
      </ControlLabel>
    );
  }

  return (
    <FormGroup>
      {controlLabel}
      {
        render(
          input, label, fieldId, fieldClass, placeholder, type, selectOptions,
          checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
          backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
        )
      }
      {touched && ((error && (
      <small className="text-danger">
        {error}
      </small>
      )) || (warning
        && (
        <small className="text-danger">
          {warning}
        </small>
        )))}
    </FormGroup>
  );
};

createRenderer.defaultProps = {
  label: null,
  required: false,
  placeholder: null,
  fieldClass: null,
  meta: {},
  selectOptions: [],
  checkboxLabel: null,
  componentClass: null,
  frontAddon: null,
  frontAddonAction: () => {},
  backAddon: null,
  backAddonAction: () => {},
  disabled: false,
  onLabel: null,
  offLabel: null,
};

createRenderer.propTypes = {
  input: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  fieldClass: PropTypes.string,
  meta: PropTypes.shape({}),
  selectOptions: PropTypes.arrayOf([
    PropTypes.shape({
      value: PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
      ),
    }),
  ]),
  checkboxLabel: PropTypes.string,
  componentClass: PropTypes.string,
  frontAddon: PropTypes.string,
  frontAddonAction: PropTypes.func,
  backAddon: PropTypes.string,
  backAddonAction: PropTypes.func,
  disabled: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
};

export const RenderInputWithAddon = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <InputGroup>
      {
        (frontAddon)
          ? (
            <InputGroup.Addon onClick={frontAddonAction}>
              {frontAddon}
            </InputGroup.Addon>
          )
          : null
      }
      <FormControl
        {...input}
        id={fieldId}
        className={fieldClass}
        componentClass={componentClass}
        placeholder={placeholder}
        type={type}
      />
      {
        (backAddon)
          ? (
            <InputGroup.Addon onClick={backAddonAction}>
              {backAddon}
            </InputGroup.Addon>
          )
          : null
      }
    </InputGroup>
  ),
);

export const RenderInput = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <FormControl
      {...input}
      id={fieldId}
      className={fieldClass}
      componentClass={componentClass}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  ),
);

export const RenderSelect = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <Select
      value={input.value}
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)}
      options={selectOptions}
      placeholder={placeholder}
      className={fieldClass}
      disabled={disabled}
    />
  ),
);

export const RenderMultiSelect = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <Select
      value={input.value}
      multi
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)}
      options={selectOptions}
      placeholder={placeholder}
      className={fieldClass}
    />
  ),
);

export const RenderCreatableSelect = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <Select.Creatable
      value={input.value}
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)}
      options={selectOptions}
      placeholder={placeholder}
      className={fieldClass}
    />
  ),
);

export const RenderCheckbox = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <Checkbox
      id={fieldId}
      label={checkboxLabel}
      onChange={input.onChange}
      checked={input.value}
    />
  ),
);

export const RenderToggleSwitch = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <Switch
      id={fieldId}
      onLabel={onLabel}
      offLabel={offLabel}
      checked={input.value}
      onChange={input.onChange}
    />
  ),
);

export const RenderImageDropzone = createRenderer(
  (
    input, label, fieldId, fieldClass, placeholder, type, selectOptions,
    checkboxLabel, componentClass, frontAddon, frontAddonAction, backAddon,
    backAddonAction, disabled, onLabel, offLabel, children, fieldOptions,
  ) => (
    <section>
      <div className="image-dropzone-container">
        <Dropzone
          onDrop={(filesToUpload, e) => {
            console.log(filesToUpload);
            const promise = new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(filesToUpload[0]);
              reader.onload = () => {
                if (reader.result) {
                  resolve(reader.result);
                } else {
                  reject(Error('Failed converting to base64'));
                }
              };
            });
            promise.then((result) => {
              const file = filesToUpload[0];
              file.data = result;
              input.onChange(filesToUpload);
            }, (err) => {
              console.log(err);
            });
          }}
          disabled={disabled}
          className={fieldClass}
          data-instructions-text="Drag image here or click to change"
          {...fieldOptions}
        >
          {
            (input.value && input.value.length > 0)
              ? (
                <Fragment>
                  {input.value.map(file => (
                    <img
                      alt="Preview"
                      key={file.data}
                      src={file.data}
                      className="image-preview"
                    />
                  ))}
                </Fragment>
              )
              : null
          }
        </Dropzone>
        <p className="placeholder">
          {placeholder}
        </p>
      </div>
    </section>
  ),
);
