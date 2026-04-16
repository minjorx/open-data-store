# open-data-store

Public dataset repository. Supports CSV / JSON / SQLite / MD formats.

## Directories

| Directory | Description |
|-----------|-------------|
| [display/](display/) | Chart visualization configs (type / style / data source) |
| [harvest/](harvest/) | Node.js data collection scripts |
| [storage/](storage/) | Data lake (raw) + metrics (processed) |

## Formats

CSV, JSON, SQLite, MD

## Project Norms

**Style: Compact. No bloat.**

### Display Config Format

```json
{
  "type": "line",
  "style": { "color": "#0969da", "title": "Example" },
  "data": "./../storage/metrics/example.csv"
}
```

| Field | Description |
|-------|-------------|
| `type` | Chart type: `line` `bar` `pie` `scatter` `table` |
| `style` | Color, size, theme, title |
| `data` | Relative path to data file in `storage/` |

### Storage Structure

```
storage/
├── data-lake/       # Raw data, organized by source/type
│   └── raw/         # Unprocessed source files
└── metrics/         # Processed, structured data
```

### File Naming

- Lowercase with hyphens: `example-data.csv`
- Include date prefix for time-series: `YYYY-MM-DD-description.csv`
- No spaces or Chinese characters in file names
