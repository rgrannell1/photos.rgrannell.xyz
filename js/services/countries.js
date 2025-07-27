
export class CountriesService {
  static TABLE = {
    "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "France": "🇫🇷",
    "Germany": "🇩🇪",
    "Ireland": "🇮🇪",
    "Italy": "🇮🇹",
    "Lanzarote": "🇪🇸",
    "Mallorca": "🇪🇸",
    "Northern Ireland": "🇬🇧",
    "Norway": "🇳🇴",
    "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "Slovenia": "🇸🇮",
    "Spain": "🇪🇸",
    "Sweden": "🇸🇪",
    "Switzerland": "🇨🇭",
    "Tenerife": "🇪🇸",
    "The Netherlands": "🇳🇱",
    "United States of America": "🇺🇸",
    "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
  }

  static flag(country) {
    if (CountriesService.TABLE[country]) {
      return CountriesService.TABLE[country];
    } else {
      return "🏳️";
    }
  }

  static flags(countries) {
    return countries.map(country => CountriesService.flag(country)).join(' ');
  }
}
