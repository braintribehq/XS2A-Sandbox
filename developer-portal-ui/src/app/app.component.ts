import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {
  CustomizeService,
  GlobalSettings,
  Theme,
} from '../services/customize.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  globalSettings: GlobalSettings;
  lang = 'en';
  langs: string[] = ['en', 'ua', 'es', 'de'];
  langIcons: object = {
    en: '../assets/icons/united-kingdom.png',
    de: '../assets/icons/germany.png',
    es: '../assets/icons/spain.png',
    ua: '../assets/icons/ukraine.png',
  };
  private langCollapsed: boolean;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    public dataService: DataService,
    public customizeService: CustomizeService,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.languageService.initializeTranslation();
    this.setLangCollapsed(true);
  }

  goToPage(page) {
    this.router.navigateByUrl(`/${page}`);
  }

  onActivate(ev) {
    this.dataService.setRouterUrl(this.actRoute['_routerState'].snapshot.url);
  }

  changeLang(lang: string) {
    this.lang = lang;
    this.languageService.setLang(lang);
    this.collapseThis();
  }

  setLangCollapsed(value: boolean) {
    this.langCollapsed = value;
  }

  collapseThis() {
    this.setLangCollapsed(!this.getLangCollapsed());
  }

  getLangCollapsed() {
    return this.langCollapsed;
  }

  ngOnInit() {
    let theme: Theme;
    this.customizeService.getJSON().then(data => {
      theme = data;
      this.globalSettings = theme.globalSettings;
      if (theme.globalSettings.logo.indexOf('/') === -1) {
        theme.globalSettings.logo =
          '../assets/UI' +
          (this.customizeService.isCustom() ? '/custom/' : '/') +
          theme.globalSettings.logo;
      }
      if (
        theme.globalSettings.favicon &&
        theme.globalSettings.favicon.href.indexOf('/') === -1
      ) {
        theme.globalSettings.favicon.href =
          '../assets/UI' +
          (this.customizeService.isCustom() ? '/custom/' : '/') +
          theme.globalSettings.favicon.href;
      }
      if (theme.contactInfo.img.indexOf('/') === -1) {
        theme.contactInfo.img =
          '../assets/UI' +
          (this.customizeService.isCustom() ? '/custom/' : '/') +
          theme.contactInfo.img;
      }
      this.customizeService.setUserTheme(theme);
    });
  }
}
