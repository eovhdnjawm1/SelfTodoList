// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		textColor: string;
		bgColor: string;
		accentColor: string;
		cardColor: string;
	}
}

// declare module "styled-components" {
// 	export interface DefaultTheme {
// 		red: string;
// 		black: {
// 			deepDark: string;
// 			darker: string;
// 			lighter: string;
// 		};
// 		white: {
// 			darker: string;
// 			lighter: string;
// 		};
// 	}
// }