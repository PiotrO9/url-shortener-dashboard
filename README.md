# Dashboard Skróconych Linków

Nowoczesny dashboard do zarządzania skróconymi linkami zbudowany w React + TypeScript + TailwindCSS.

## 🚀 Funkcjonalności

### 📊 Przegląd

- **Karty statystyk** - wyświetlanie kluczowych metryk (łączna liczba linków, kliknięć, aktywnych linków)
- **Najnowsze linki** - tabela z ostatnio utworzonymi linkami
- **Najpopularniejsze linki** - ranking linków według liczby kliknięć

### 🔗 Zarządzanie linkami

- **Tabela linków** z możliwością sortowania
- **Akcje na linkach** - kopiowanie, przełączanie statusu, usuwanie
- **Filtrowanie i wyszukiwanie**

### 📈 Analityka

- **Wykresy ruchu** - wizualizacja kliknięć w czasie
- **Top kraje** - statystyki geograficzne
- **Źródła ruchu** - analiza referrerów
- **Podsumowanie** - kluczowe wskaźniki wydajności

## 🛠️ Technologie

- **React 19** - nowoczesny framework UI
- **TypeScript** - typowanie statyczne
- **TailwindCSS 4** - utility-first CSS framework
- **Vite** - szybki bundler i dev server

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── Dashboard.tsx   # Główny komponent dashboardu
│   ├── Header.tsx      # Nagłówek z nawigacją
│   ├── StatsCards.tsx  # Karty ze statystykami
│   ├── LinksTable.tsx  # Tabela linków
│   └── Charts.tsx      # Komponenty wykresów
├── data/               # Mockowane dane
│   └── mockData.ts     # Dane testowe
├── types/             # Definicje TypeScript
│   └── index.ts       # Interfejsy i typy
└── App.tsx            # Główny komponent aplikacji
```

## 🎨 Design System

### Kolory

- **Primary**: Blue (600/700) - główne akcje
- **Success**: Green (500/600) - pozytywne wskaźniki
- **Warning**: Yellow (500/600) - ostrzeżenia
- **Danger**: Red (500/600) - błędy i usuwanie
- **Neutral**: Gray (50-900) - tekst i tła

### Komponenty

- **Responsywne** - dostosowane do wszystkich urządzeń
- **Accessible** - zgodne z WCAG 2.1
- **Hover effects** - interaktywne elementy
- **Loading states** - płynne przejścia
- **Animacje** - fade-in, slide-up, bounce-subtle
- **Custom scrollbar** - stylizowane paski przewijania

### Style CSS

- **Custom classes** - btn-primary, btn-secondary, btn-danger
- **Card components** - card, card-header
- **Status badges** - status-active, status-inactive
- **Focus styles** - focus-ring dla accessibility
- **Animations** - keyframes dla płynnych przejść

## 🚀 Uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Linting
npm run lint

# Formatowanie kodu
npm run format
```

## 📱 Responsywność

Dashboard jest w pełni responsywny i dostosowuje się do:

- **Mobile** (< 768px) - pojedyncza kolumna
- **Tablet** (768px - 1024px) - dwie kolumny
- **Desktop** (> 1024px) - pełny layout

## ♿ Dostępność

- **Keyboard navigation** - pełna obsługa klawiatury
- **Screen readers** - aria-labels i semantyczne elementy
- **Color contrast** - odpowiedni kontrast kolorów
- **Focus indicators** - widoczne wskaźniki fokusa

## 🔧 Konfiguracja

### TailwindCSS

Projekt używa TailwindCSS 4 z nową składnią:

```css
@import 'tailwindcss/preflight';
@import 'tailwindcss/utilities';
```

### Custom CSS

Dodatkowe style CSS dla:

- **Button components** - btn-primary, btn-secondary, btn-danger
- **Card layouts** - card, card-header
- **Status indicators** - status-active, status-inactive
- **Animations** - fadeIn, slideUp, bounceSubtle
- **Focus management** - focus-ring dla accessibility
- **Custom scrollbar** - stylizowane paski przewijania

### TypeScript

Ścisłe typowanie z `verbatimModuleSyntax` dla lepszej kontroli importów.

### ESLint + Prettier

Automatyczne formatowanie i linting kodu.

## 📊 Mockowane dane

Aplikacja używa realistycznych danych testowych:

- **5 skróconych linków** z różnymi metrykami
- **Statystyki ruchu** z ostatnich 7 dni
- **Dane geograficzne** i źródła ruchu
- **Historia kliknięć** z timestampami

## 🎯 Przyszłe rozszerzenia

- [ ] Integracja z API
- [ ] Autentykacja użytkowników
- [ ] Eksport danych (CSV/PDF)
- [ ] Notyfikacje w czasie rzeczywistym
- [ ] Zaawansowane filtry
- [ ] Bulk operations
- [ ] Custom domains
- [ ] QR codes

## 📄 Licencja

MIT License - projekt edukacyjny.
