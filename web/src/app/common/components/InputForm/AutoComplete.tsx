import { AutoComplete } from 'antd';
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
}

const AutoCompleteInput = ({
  options,
  placeholder,
  onChange,
  searchCondition,
  ...props
}: Props) => {
  const [renderOptions, setRenderOptions] = useState(options);

  const onSearch = (keyword: string) => {
    setRenderOptions(
      !keyword ? [] : options?.filter(value => searchCondition(keyword, value)),
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
    border-radius: 5px !important;
  }
`;
