import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { fontFamily } from './theme/tokens/fonts'

function TicksRule() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: -4.5,
          borderWidth: 5,
          borderStyle: 'solid',
          borderColor: 'transparent',
        },
        '&::before': {
          left: 0,
          borderLeftColor: 'divider',
        },
        '&::after': {
          right: 0,
          borderRightColor: 'divider',
        },
      }}
    />
  )
}

function App() {
  const [count, setCount] = useState(0)
  const theme = useTheme()
  const iconInvert =
    theme.palette.mode === 'dark' ? 'invert(1) brightness(2)' : 'none'

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        maxWidth: 1126,
        mx: 'auto',
        textAlign: 'center',
        borderLeft: 1,
        borderRight: 1,
        borderColor: 'divider',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        component="section"
        id="center"
        spacing={{ xs: 2.25, lg: 3.125 }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          py: { xs: 4, lg: 0 },
          px: { xs: 2.5, lg: 0 },
        }}
      >
        <Box
          className="hero"
          sx={{
            position: 'relative',
            '& .hero-base, & .hero-framework, & .hero-vite': {
              display: 'block',
              mx: 'auto',
            },
            '& .hero-base': {
              width: 170,
              position: 'relative',
              zIndex: 0,
            },
            '& .hero-framework, & .hero-vite': {
              position: 'absolute',
              insetInline: 0,
            },
            '& .hero-framework': {
              zIndex: 1,
              top: 34,
              height: 28,
              transform:
                'perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)',
            },
            '& .hero-vite': {
              zIndex: 0,
              top: 107,
              height: 26,
              width: 'auto',
              transform:
                'perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)',
            },
          }}
        >
          <Box
            component="img"
            src={heroImg}
            className="hero-base"
            width={170}
            height={179}
            alt=""
          />
          <Box
            component="img"
            src={reactLogo}
            className="hero-framework"
            alt="React logo"
          />
          <Box
            component="img"
            src={viteLogo}
            className="hero-vite"
            alt="Vite logo"
          />
        </Box>

        <Box>
          <Typography variant="h1" component="h1" sx={{ my: { xs: 2.5, lg: 4 } }}>
            Get started
          </Typography>
          <Typography variant="body1" component="p">
            Edit{' '}
            <Box
              component="code"
              sx={{
                fontFamily: fontFamily.mono,
                fontSize: 15,
                lineHeight: 1.35,
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
                color: 'text.primary',
                bgcolor: (t) =>
                  t.palette.mode === 'light' ? 'grey.100' : 'grey.800',
              }}
            >
              src/App.tsx
            </Box>{' '}
            and save to test{' '}
            <Box
              component="code"
              sx={{
                fontFamily: fontFamily.mono,
                fontSize: 15,
                lineHeight: 1.35,
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
                color: 'text.primary',
                bgcolor: (t) =>
                  t.palette.mode === 'light' ? 'grey.100' : 'grey.800',
              }}
            >
              HMR
            </Box>
          </Typography>
        </Box>

        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => setCount((c) => c + 1)}
          sx={{
            fontFamily: fontFamily.mono,
            mb: 3,
            py: 0.625,
            px: 1.25,
            borderWidth: 2,
            bgcolor: (t) =>
              t.palette.mode === 'light'
                ? 'rgba(123, 104, 238, 0.1)'
                : 'rgba(123, 104, 238, 0.2)',
            '&:hover': {
              borderWidth: 2,
              borderColor: 'primary.main',
            },
          }}
        >
          Count is {count}
        </Button>
      </Stack>

      <TicksRule />

      <Stack
        component="section"
        id="next-steps"
        direction={{ xs: 'column', lg: 'row' }}
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          textAlign: { xs: 'center', lg: 'left' },
        }}
      >
        <Box
          id="docs"
          sx={{
            flex: '1 1 0',
            p: { xs: 3, lg: 4 },
            borderRight: { lg: 1 },
            borderBottom: { xs: 1, lg: 0 },
            borderColor: 'divider',
          }}
        >
          <Box
            component="svg"
            className="icon"
            sx={{ mb: 2, width: 22, height: 22, display: 'block', mx: { xs: 'auto', lg: 0 } }}
            role="presentation"
            aria-hidden
          >
            <use href="/icons.svg#documentation-icon" />
          </Box>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            Documentation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your questions, answered
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              mt: { xs: 2.5, lg: 4 },
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', lg: 'flex-start' },
            }}
          >
            <Box component="li" sx={{ flex: { xs: '1 1 calc(50% - 8px)', lg: '0 0 auto' } }}>
              <Link
                href="https://vite.dev/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.primary',
                  fontSize: 16,
                  borderRadius: 1.5,
                  bgcolor: 'action.selected',
                  display: 'flex',
                  px: 1.5,
                  py: 0.75,
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  width: { xs: '100%', lg: 'auto' },
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  boxSizing: 'border-box',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: (t) =>
                      t.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px'
                        : 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
                  },
                }}
              >
                <Box component="img" src={viteLogo} alt="" sx={{ height: 18 }} />
                Explore Vite
              </Link>
            </Box>
            <Box component="li" sx={{ flex: { xs: '1 1 calc(50% - 8px)', lg: '0 0 auto' } }}>
              <Link
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.primary',
                  fontSize: 16,
                  borderRadius: 1.5,
                  bgcolor: 'action.selected',
                  display: 'flex',
                  px: 1.5,
                  py: 0.75,
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  width: { xs: '100%', lg: 'auto' },
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  boxSizing: 'border-box',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: (t) =>
                      t.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px'
                        : 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
                  },
                }}
              >
                <Box
                  component="img"
                  src={reactLogo}
                  alt=""
                  sx={{ height: 18, filter: iconInvert }}
                />
                Learn more
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          id="social"
          sx={{ flex: '1 1 0', p: { xs: 3, lg: 4 } }}
        >
          <Box
            component="svg"
            className="icon"
            sx={{ mb: 2, width: 22, height: 22, display: 'block', mx: { xs: 'auto', lg: 0 } }}
            role="presentation"
            aria-hidden
          >
            <use href="/icons.svg#social-icon" />
          </Box>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            Connect with us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join the Vite community
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              mt: { xs: 2.5, lg: 4 },
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', lg: 'flex-start' },
            }}
          >
            {[
              { href: 'https://github.com/vitejs/vite', icon: '#github-icon', label: 'GitHub' },
              { href: 'https://chat.vite.dev/', icon: '#discord-icon', label: 'Discord' },
              { href: 'https://x.com/vite_js', icon: '#x-icon', label: 'X.com' },
              { href: 'https://bsky.app/profile/vite.dev', icon: '#bluesky-icon', label: 'Bluesky' },
            ].map(({ href, icon, label }) => (
              <Box
                key={href}
                component="li"
                sx={{ flex: { xs: '1 1 calc(50% - 8px)', lg: '0 0 auto' } }}
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.primary',
                    fontSize: 16,
                    borderRadius: 1.5,
                    bgcolor: 'action.selected',
                    display: 'flex',
                    px: 1.5,
                    py: 0.75,
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    width: { xs: '100%', lg: 'auto' },
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                    boxSizing: 'border-box',
                    transition: 'box-shadow 0.3s',
                    '&:hover': {
                      boxShadow: (t) =>
                        t.palette.mode === 'light'
                          ? 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px'
                          : 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
                    },
                  }}
                >
                  <Box
                    component="svg"
                    className="button-icon"
                    sx={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      filter: iconInvert,
                    }}
                    role="presentation"
                    aria-hidden
                  >
                    <use href={`/icons.svg${icon}`} />
                  </Box>
                  {label}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>

      <TicksRule />

      <Box
        component="section"
        id="spacer"
        sx={{
          height: { xs: 48, lg: 88 },
          borderTop: 1,
          borderColor: 'divider',
        }}
      />
    </Container>
  )
}

export default App
