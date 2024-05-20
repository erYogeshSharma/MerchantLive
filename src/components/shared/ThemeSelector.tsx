import {
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { themes } from "../../constants/daisy-themes";

const ThemeButton = ({
  theme,
}: {
  theme: string;
  onClick: (theme: string) => void;
  selected?: boolean;
}) => {
  type themeKey = keyof typeof themes;
  const colorKeys = ["primary", "secondary", "accent", "neutral", "base-100"];
  return (
    <Paper
      sx={{
        background: themes[theme as themeKey]["base-100"],
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={1.5}
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
          width={150}
          variant="caption"
          fontWeight={600}
          sx={{
            color:
              themes[theme as themeKey][
                "base-content" as keyof (typeof themes)[themeKey]
              ],
            flexGrow: 1,
          }}
        >
          {theme.replace(theme[0], theme[0].toUpperCase())}{" "}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.3}>
          {colorKeys.map((color) => (
            <Stack
              key={color}
              height={30}
              width={15}
              sx={{
                background:
                  themes[theme as themeKey][
                    color as keyof (typeof themes)[themeKey]
                  ],
                borderRadius: 8,
              }}
            ></Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
const ThemeSelector = ({
  value,
  onClick,
  loading = false,
}: {
  value: string;
  onClick: (theme: string) => void;
  loading?: boolean;
}) => {
  return (
    <Stack>
      <Typography variant="body2" fontWeight={500}>
        Select Theme
      </Typography>
      {loading && <LinearProgress />}
      <Select
        disabled={loading}
        value={value}
        onChange={(e) => onClick(e.target.value)}
        sx={{
          "& .MuiSelect-select": {
            p: 1,
          },
        }}
      >
        {Object.keys(themes).map((theme, index) => (
          <MenuItem sx={{ py: 1 }} value={theme} key={index}>
            <ThemeButton
              onClick={onClick}
              theme={theme}
              key={index}
              selected={value === theme}
            />
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default ThemeSelector;
