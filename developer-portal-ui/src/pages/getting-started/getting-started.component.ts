import { Component, OnInit } from '@angular/core';
import { CustomizeService, Theme } from '../../services/customize.service';
import { saveAs } from 'file-saver';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent implements OnInit {
  defaultTheme: Theme;
  settings: Settings;
  constructor(
    private customizeService: CustomizeService,
    private settingsService: SettingsService
  ) {
    this.defaultTheme = customizeService.getTheme('default');
    this.defaultTheme.globalSettings.logo = 'Logo_XS2ASandbox.png';
  }

  exportTheme() {
    const blob = new Blob([JSON.stringify(this.defaultTheme, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'exampleTheme');
  }

  ngOnInit() {
    this.settings = this.settingsService.settings;
    console.log(this.settings);
  }
}
