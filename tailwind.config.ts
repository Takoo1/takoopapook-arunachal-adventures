
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['var(--font-primary)', 'Inter', 'ui-sans-serif', 'system-ui'],
				'display': ['var(--font-display)', 'Playfair Display', 'serif'],
				'body': ['var(--font-body)', 'Inter', 'ui-sans-serif', 'system-ui'],
				'inter': ['Inter', 'ui-sans-serif', 'system-ui'],
				'playfair': ['Playfair Display', 'serif'],
				'poppins': ['Poppins', 'ui-sans-serif', 'system-ui'],
				'roboto': ['Roboto', 'ui-sans-serif', 'system-ui'],
				'opensans': ['Open Sans', 'ui-sans-serif', 'system-ui'],
				'montserrat': ['Montserrat', 'ui-sans-serif', 'system-ui'],
			},
			fontSize: {
				'xs': ['var(--font-size-xs)', { lineHeight: 'var(--line-height-xs)' }],
				'sm': ['var(--font-size-sm)', { lineHeight: 'var(--line-height-sm)' }],
				'base': ['var(--font-size-base)', { lineHeight: 'var(--line-height-base)' }],
				'lg': ['var(--font-size-lg)', { lineHeight: 'var(--line-height-lg)' }],
				'xl': ['var(--font-size-xl)', { lineHeight: 'var(--line-height-xl)' }],
				'2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-2xl)' }],
				'3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-3xl)' }],
				'4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-4xl)' }],
				'5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-5xl)' }],
				'6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-6xl)' }],
				'7xl': ['var(--font-size-7xl)', { lineHeight: 'var(--line-height-7xl)' }],
				'8xl': ['var(--font-size-8xl)', { lineHeight: 'var(--line-height-8xl)' }],
				'9xl': ['var(--font-size-9xl)', { lineHeight: 'var(--line-height-9xl)' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
