import React, { ReactElement, ReactNode, useCallback, useContext, useEffect, useRef } from 'react';
import useMergeProps from '../hooks/useMergeProps';
import useMergeValue from '../hooks/useMergeValue';
import IconHover from '../icon-hover';
import { ConfigContext } from '../providers/context';
import cs from '../utils/classNames';
import { isFunction, isNullOrUndefined, isString } from '../utils/is';
import omit from '../utils/omit';
import Group, { CheckboxGroupContext } from './group';
import IconCheck from './icon-check';
import { CheckboxProps } from './interface';
import useCheckbox from './useCheckbox';

function Checkbox<T extends string | number>(baseProps: CheckboxProps<T>, ref:React.LegacyRef<HTMLLabelElement>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { getPrefixCls,  rtl } = useContext(ConfigContext);
  const props = useMergeProps<CheckboxProps>(baseProps, {},{});

  const context = useContext(CheckboxGroupContext);
  const prefixCls = getPrefixCls('checkbox');
  const { onGroupChange } = context;

  const mergeProps = { ...props };

  if (context.isCheckboxGroup) {
    mergeProps.checked = context.checkboxGroupValue.indexOf(props.value) !== -1;
    mergeProps.disabled = 'disabled' in props ? props.disabled : context.disabled;
  }

  const { disabled, children, className, value, style, indeterminate, error, ...rest } = mergeProps;

  const [checked, setChecked] = useMergeValue(false, {
    value: mergeProps.checked,
    defaultValue: mergeProps.defaultChecked,
  });

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: !!disabled,
      [`${prefixCls}-indeterminate`]: !!indeterminate,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-rtl`]: rtl,
      error,
    },
    className
  );

  console.info('render')
  useEffect(() => {
    context.registerValue(value);

    return () => {
      context.unRegisterValue(value);
    };
  }, [value]);

  const {value:propValue,onChange:propOnChange} = props;
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      e.stopPropagation();
      setChecked(e.target.checked);
      if (context.isCheckboxGroup) {
        onGroupChange && onGroupChange(propValue, e.target.checked, e);
      }
      propOnChange && propOnChange(e.target.checked, e);
    },
    [setChecked, context.isCheckboxGroup, propOnChange, onGroupChange, propValue]
  );

  const onLabelClick = React.useCallback(
    (e:React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
      if (isFunction(props.children)) {
        // 避免children中含有表单元素造成label无法触发input的onchange的情况
        e.preventDefault();
        inputRef.current && inputRef.current.click();
      }
      rest.onClick && rest.onClick(e);
    },
    [props.children, rest]
  );

  let icon: ReactNode = <IconCheck className={`${prefixCls}-mask-icon`} />;
  if (mergeProps.icon) {
    if (React.isValidElement(mergeProps.icon)) {
      icon = React.cloneElement(mergeProps.icon as ReactElement, {
        className: `${prefixCls}-mask-icon`,
      });
    } else {
      icon = mergeProps.icon;
    }
  }
  console.info('children',children)

  return (
    <label
      ref={ref}
      aria-disabled={disabled}
      {...omit(rest, ['onChange'])}
      onClick={onLabelClick}
      className={classNames}
      style={style}
    >
      <input
        value={value}
        disabled={!!disabled}
        ref={inputRef}
        checked={!!checked}
        onChange={onChange}
        // To avoid triggering onChange twice in Select if it's used in Select option.
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
      />

      {React.isValidElement(children) || isString(children) ? (
        <>
          <IconHover
            prefix={prefixCls}
            className={`${prefixCls}-mask-wrapper`}
            disabled={checked || disabled || indeterminate}
          >
            <div className={`${prefixCls}-mask`}>{icon}</div>
          </IconHover>
          {!isNullOrUndefined(children) && <span className={`${prefixCls}-text`}>{children}
          </span>}
        </>
      ) : isFunction(children)?(
          children({ checked, indeterminate }) as React.ReactNode
      ):null}
    </label>
  );
}

interface ForwardRefCheckboxType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<unknown>
  > {
  <T extends string|number>(
    props: React.PropsWithChildren<CheckboxProps<T>> & {
      ref?: React.Ref<unknown>;
    }
  ): React.ReactElement;
  Group: typeof Group;
  useCheckbox: typeof useCheckbox;
}

const CheckboxComponent = React.forwardRef(Checkbox) as ForwardRefCheckboxType;

CheckboxComponent.displayName = 'Checkbox';

CheckboxComponent.Group = Group;

CheckboxComponent.useCheckbox = useCheckbox;

export default CheckboxComponent;

export type { CheckboxProps };
