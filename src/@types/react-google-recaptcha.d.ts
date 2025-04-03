declare module 'react-google-recaptcha' {
    import { Component } from 'react';
  
    interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (token: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      theme?: 'light' | 'dark';
      size?: 'compact' | 'normal' | 'invisible';
      tabIndex?: number;
      badge?: 'bottomright' | 'bottomleft' | 'inline';
    }
  
    export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {}
  }
  