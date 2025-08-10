const SPECIAL_CHARACTERS = '`~!@#$%^&*=+-_\\/|,.;(){}[]<>';

export interface IPasswordOptions {
  passwordLength: number;
  shouldIncludeNumbers: boolean;
  shouldIncludeLowercasedLetters: boolean;
  shouldIncludeUppercasedLetters: boolean;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  specialCharacters: string;
}

export const defaultPasswordOptions: IPasswordOptions = {
  passwordLength: 16,
  shouldIncludeNumbers: true,
  shouldIncludeLowercasedLetters: true,
  shouldIncludeUppercasedLetters: true,
  shouldAllowSequence: false,
  shouldAllowTripleRepeat: false,
  specialCharacters: SPECIAL_CHARACTERS
}

export interface IPasswordReadableOptions {
  numberOfWords: number;
  shouldIncludeSymbol: boolean;
  shouldIncludeDate: boolean;
}

export const defaultPasswordReadableOptions: IPasswordReadableOptions = {
  numberOfWords: 2,
  shouldIncludeSymbol: true,
  shouldIncludeDate: true
}