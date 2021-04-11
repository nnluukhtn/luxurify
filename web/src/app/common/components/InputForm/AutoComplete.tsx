import { AutoComplete } from 'antd';
import Colors from 'app/common/Colors';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface Option {
  label: string | React.ReactNode;
  value: string;
}

export type Options = Option[];

interface Props {
  options: Options;
  placeholder: string;
  onChange: (value: string) => void;
  searchCondition: (keywords, options: Option) => boolean;
  defaultOptions?: Options;
}

const AutoCompleteInput = ({
  options,
  placeholder,
  onChange,
  searchCondition,
  defaultOptions = [],
  ...props
}: Props) => {
  const [renderOptions, setRenderOptions] = useState(options);

  const onSearch = (keyword: string) => {
    setRenderOptions(
      !keyword
        ? defaultOptions
        : options?.filter(value => searchCondition(keyword, value)),
    );
    onChange(keyword);
  };

  return (
    <StyledAutoComplete
      {...props}
      onSearch={onSearch}
      onSelect={onChange}
      placeholder={placeholder}
    >
      {renderOptions.map((item, idx) => (
        <AutoComplete.Option key={item.value + '_' + idx} value={item.value}>
          {item.value}
        </AutoComplete.Option>
      ))}
    </StyledAutoComplete>
  );
};

export default AutoCompleteInput;

export const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  .ant-select-selector {
    font-family: inherit;
    font-weight: 400;
    border-radius: 5px !important;
    height: 36px !important;
  }
`;
