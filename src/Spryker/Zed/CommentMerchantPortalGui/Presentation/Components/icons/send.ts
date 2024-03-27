import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<path d="M19.696 0.14925C19.4819 0.0064386 19.1965 -0.0649669 18.911 0.0778442L0.356811 9.36057C0.142724 9.50338 0 9.789 0 10.0032C0 10.2888 0.214087 10.5031 0.428174 10.6459L4.70991 12.2882C5.06672 12.431 5.49489 12.2168 5.63762 11.8598C5.78034 11.5027 5.56626 11.0743 5.20945 10.9315L2.42632 9.86041L15.6283 3.2911L7.35031 11.6455C7.20759 11.7884 7.13623 11.9312 7.13623 12.1454V19.2859C7.13623 19.5716 7.35031 19.8572 7.63576 20H7.84985C8.06394 20 8.27802 19.8572 8.42075 19.7144L11.8461 14.9302L15.4143 16.4297C15.4856 16.4297 15.6283 16.5011 15.6997 16.5011C15.8424 16.5011 15.9138 16.5011 16.0565 16.4297C16.2706 16.3583 16.342 16.1441 16.4133 15.9299L19.9814 0.934711C20.0528 0.649089 19.9101 0.363467 19.696 0.14925ZM8.56347 17.0724V13.5735L10.4903 14.359L8.56347 17.0724ZM15.2002 14.716L8.84892 12.1454L17.9833 3.00547L15.2002 14.716Z" />
</svg>
`;

@NgModule({
    providers: [provideIcons([IconSendModule])],
})
export class IconSendModule {
    static icon = 'send';
    static svg = svg;
}