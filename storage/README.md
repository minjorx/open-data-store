# Storage

## Structure

```
storage/
├── data-lake/    # Raw data, organized by source
│   └── worldbank/
└── metrics/      # Processed / derived data
```

## Rules

### data-lake

- Source data as-is (download, scrape, API fetch)
- Subdirectories by data source, not by file format
- Example: `data-lake/worldbank/2026-04-08-population.csv`

### metrics

- Output of harvest scripts (cleaned, aggregated, transformed)
- Example: `metrics/country-population-growth-2024.csv`

## File Naming

- Lowercase with hyphens: `example-data.csv`
- Date prefix for time-series: `YYYY-MM-DD-description.csv`
- No spaces or Chinese characters

## index.json

Each directory has an `index.json`. Update it when adding/removing files.
