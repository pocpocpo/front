import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import i18next from 'i18next';
import { LanguageSelectorContainer } from './styles';

type Option = {
  value: string;
  label: string;
};

const I18N_STORAGE_KEY = 'i18nextLng';
const languageOptions: Array<Option> = [
  { value: 'pt-BR', label: 'pt' },
  { value: 'en-US', label: 'en' },
];

function checkLanguageAtLocalStorage(): Option {
  return localStorage.getItem(I18N_STORAGE_KEY) === 'pt-BR'
    ? { value: 'pt-BR', label: 'pt' }
    : { value: 'en-US', label: 'en' };
}

function LanguageSelector(): JSX.Element {
  const [selectedLanguageOption, setSelectedLanguageOption] = useState<Option>(
    checkLanguageAtLocalStorage(),
  );

  useEffect(() => {
    i18next.changeLanguage(selectedLanguageOption.value);
  }, [selectedLanguageOption]);

  return (
    <LanguageSelectorContainer>
      <Select
        defaultValue={selectedLanguageOption || { value: 'pt-BR', label: 'pt' }}
        onChange={(value: SingleValue<Option>) =>
          setSelectedLanguageOption(value!)
        }
        options={languageOptions}
      />
    </LanguageSelectorContainer>
  );
}

export default LanguageSelector;
