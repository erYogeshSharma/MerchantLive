import { Paper, Stack, Typography } from "@mui/material";
import { themes } from "../../constants/daisy-themes";
import { Check } from "@mui/icons-material";

const ThemeButton = ({
  theme,
  onClick,
  selected = false,
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
        spacing={1}
        onClick={() => onClick(theme)}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={1.5}
        width={300}
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
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
        <Stack width={30}>
          {selected && (
            <Check
              color="primary"
              sx={{
                background: (theme) => theme.palette.primary.light,
                p: 0.5,
                borderRadius: "50%",
              }}
            />
          )}
        </Stack>
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
}: {
  value: string;
  onClick: (theme: string) => void;
}) => {
  return (
    <Stack spacing={1} alignItems="flex-start">
      {Object.keys(themes).map((theme, index) => (
        <ThemeButton
          onClick={onClick}
          theme={theme}
          key={index}
          selected={value === theme}
        />
      ))}
    </Stack>
  );
};

export default ThemeSelector;
