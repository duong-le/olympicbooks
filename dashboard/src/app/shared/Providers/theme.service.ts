import { Injectable } from '@angular/core';

import { ThemeType } from '../Enums/theme-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  defaultTheme = ThemeType.DEFAULT;
  currentTheme: ThemeType;

  constructor() {
    const savedTheme: any = localStorage.getItem('theme');

    if (Object.values(ThemeType).includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = this.defaultTheme;
      localStorage.setItem('theme', this.defaultTheme);
    }
  }

  private getReversedTheme(): ThemeType {
    return this.currentTheme === ThemeType.DARK ? ThemeType.DEFAULT : ThemeType.DARK;
  }

  private reverseTheme(): void {
    const reversedTheme = this.getReversedTheme();
    this.currentTheme = reversedTheme;
    localStorage.setItem('theme', reversedTheme);
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    if (firstLoad) {
      document.documentElement.classList.add(this.currentTheme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${this.currentTheme}.css`, this.currentTheme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(this.currentTheme);
          }
          this.removeUnusedTheme(this.getReversedTheme());
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  public toggleTheme(): Promise<Event> {
    this.reverseTheme();
    return this.loadTheme(false);
  }
}
