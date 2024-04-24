import React, { PropsWithChildren, useContext } from 'react';
import { ConfigContext } from './providers/context';
import cs from './utils/classNames';

interface HoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'mini' | 'default' | 'large';
  className?: string;
  prefix?: string;
  disabled?: boolean;
}

export default function IconHover(props: PropsWithChildren<HoverProps>) {
  const {  className, disabled, prefix, size = 'default', ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon-hover');

  return (
    <span
      className={cs(
        prefixCls,
        {
          [`${prefix}-icon-hover`]: prefix,
          [`${prefixCls}-size-${size}`]: size && size !== 'default',
          [`${prefixCls}-disabled`]: disabled,
        },
        className
      )}
      {...rest}
      />
  );
}
