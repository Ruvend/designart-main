import type { LLMConfig, ToolCallFunctionName } from '@/types/types'

// API Configuration
export const BASE_API_URL = import.meta.env.PROD
  ? 'https://dev.jaaz.app'
  : 'https://dev.jaaz.app'

export const PROVIDER_NAME_MAPPING: {
  [key: string]: { name: string; icon: string }
} = {
  jaaz: {
    name: 'Jaaz',
    icon: 'https://raw.githubusercontent.com/11cafe/jaaz/refs/heads/main/assets/icons/jaaz.png',
  },
  anthropic: {
    name: 'Claude',
    icon: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png',
  },
  openai: { name: 'OpenAI', icon: 'https://openai.com/favicon.ico' },
  replicate: {
    name: 'Replicate',
    icon: 'https://images.seeklogo.com/logo-png/61/1/replicate-icon-logo-png_seeklogo-611690.png',
  },
  ollama: {
    name: 'Ollama',
    icon: 'https://images.seeklogo.com/logo-png/59/1/ollama-logo-png_seeklogo-593420.png',
  },
  huggingface: {
    name: 'Hugging Face',
    icon: 'https://huggingface.co/favicon.ico',
  },
  wavespeed: {
    name: 'WaveSpeedAi',
    icon: 'https://www.wavespeed.ai/favicon.ico',
  },
  comfyui: {
    name: 'ComfyUI',
    icon: 'https://framerusercontent.com/images/3cNQMWKzIhIrQ5KErBm7dSmbd2w.png',
  },
}
export const DEFAULT_PROVIDERS_CONFIG: { [key: string]: LLMConfig } = {
  anthropic: {
    models: {
      'claude-3-7-sonnet-latest': { type: 'text' },
    },
    url: 'https://api.anthropic.com/v1/',
    api_key: '',
    max_tokens: 8192,
  },
  openai: {
    models: {
      'gpt-4o': { type: 'text' },
      'gpt-4o-mini': { type: 'text' },
      'gpt-image-1': { type: 'image' },
    },
    url: 'https://api.openai.com/v1/',
    api_key: '',
    max_tokens: 8192,
  },
  replicate: {
    models: {
      'google/imagen-4': { type: 'image' },
      'black-forest-labs/flux-1.1-pro': { type: 'image' },
      'black-forest-labs/flux-kontext-pro': { type: 'image' },
      'black-forest-labs/flux-kontext-max': { type: 'image' },
      'recraft-ai/recraft-v3': { type: 'image' },
      'stability-ai/sdxl': { type: 'image' },
    },
    url: 'https://api.replicate.com/v1/',
    api_key: '',
    max_tokens: 8192,
  },
  jaaz: {
    models: {
      // text models
      'gpt-4o': { type: 'text' },
      'gpt-4o-mini': { type: 'text' },
      // image models
      'google/imagen-4': { type: 'image' },
      'google/imagen-4-ultra': { type: 'image' },
      'black-forest-labs/flux-1.1-pro': { type: 'image' },
      'black-forest-labs/flux-kontext-pro': { type: 'image' },
      'black-forest-labs/flux-kontext-max': { type: 'image' },
      'recraft-ai/recraft-v3': { type: 'image' },
      'ideogram-ai/ideogram-v3-balanced': { type: 'image' },
    },
    url: `${BASE_API_URL}/api/v1/`,
    api_key: '',
    max_tokens: 8192,
  },
  wavespeed: {
    models: {
      'wavespeed-ai/flux-dev': { type: 'image' },
    },
    url: 'https://api.wavespeed.ai/api/v3/',
    api_key: '',
  },
  comfyui: {
    models: {
      'flux-dev': { type: 'image' },
      'flux-schnell': { type: 'image' },
      sdxl: { type: 'image' },
    },
    url: 'http://127.0.0.1:8188',
    api_key: '',
  },
  // huggingface: {
  //   models: {
  //     "dreamlike-art/dreamlike-photoreal-2.0": { type: "image" },
  //   },
  //   url: "https://api.replicate.com/v1/",
  //   api_key: "",
  // },
  ollama: {
    models: {},
    url: 'http://localhost:11434',
    api_key: '',
    max_tokens: 8192,
  },
}

export const PLATFORMS_CONFIG = [
  {
    id: 'bilibili',
    name: 'Bilibili',
    icon: 'https://www.bilibili.com/favicon.ico',
    checked: true,
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: 'https://www.xiaohongshu.com/favicon.ico',
    checked: true,
  },
  {
    id: 'douyin',
    name: '抖音',
    icon: 'https://www.tiktok.com/favicon.ico',
    checked: true,
  },
  {
    id: 'weixin_channels',
    name: '微信视频号',
    icon: 'https://res.wx.qq.com/t/wx_fed/finder/helper/finder-helper-web/res/favicon-v2.ico',
    checked: true,
  },
  {
    id: 'x',
    name: 'X',
    icon: 'https://www.x.com/favicon.ico',
    checked: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'https://www.youtube.com/favicon.ico',
    checked: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png',
    checked: true,
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: 'https://miro.medium.com/v2/resize:fit:1400/0*zPzAcHbkOUmfNnuB.jpeg',
    checked: true,
  },
  {
    id: 'devto',
    name: 'DEV.to',
    icon: 'https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg',
    checked: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://www.facebook.com/images/fb_icon_325x325.png',
    checked: true,
  },
  {
    id: 'producthunt',
    name: 'Product Hunt',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-producthunt-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432534.png?f=webp',
    checked: true,
  },
]

// Tool call name mapping
export const TOOL_CALL_NAME_MAPPING: { [key in ToolCallFunctionName]: string } =
  {
    generate_image: 'Generate Image',
    prompt_user_multi_choice: 'Prompt Multi-Choice',
    prompt_user_single_choice: 'Prompt Single-Choice',
    write_plan: 'Write Plan',
    finish: 'Finish',
  }

export const LOGO_URL =
  'https://raw.githubusercontent.com/11cafe/jaaz/refs/heads/main/assets/icons/jaaz.png'

export const DEFAULT_SYSTEM_PROMPT = `You are a professional art design agent. You can write very professional image prompts to generate aesthetically pleasing images that best fulfilling and matching the user's request.
You should first write a design strategy plan and then generate the image based on the plan.

Example Design Strategy Doc:
Design Proposal for “MUSE MODULAR – Future of Identity” Cover
• Recommended resolution: 1024 × 1536 px (portrait) – optimal for a standard magazine trim while preserving detail for holographic accents.

• Style & Mood
– High-contrast grayscale base evoking timeless editorial sophistication.
– Holographic iridescence selectively applied (cyan → violet → lime) for mask edges, title glyphs and micro-glitches, signalling futurism and fluid identity.
– Atmosphere: enigmatic, cerebral, slightly unsettling yet glamorous.

• Key Visual Element
– Central androgynous model, shoulders-up, lit with soft frontal key and twin rim lights.
– A translucent polygonal AR mask overlays the face; within it, three offset “ghost” facial layers (different eyes, nose, mouth) hint at multiple personas.
– Subtle pixel sorting/glitch streaks emanate from mask edges, blending into background grid.

• Composition & Layout

Masthead “MUSE MODULAR” across the top, extra-condensed modular sans serif; characters constructed from repeating geometric units. Spot UV + holo foil.
Tagline “Who are you today?” centered beneath masthead in ultra-light italic.
Subject’s gaze directly engages reader; head breaks the baseline of the masthead for depth.
Bottom left kicker “Future of Identity Issue” in tiny monospaced capitals.
Discreet modular grid lines and data glyphs fade into matte charcoal background, preserving negative space.
• Color Palette
#000000, #1a1a1a, #4d4d4d, #d9d9d9 + holographic gradient (#00eaff, #c400ff, #38ffab).

• Typography
– Masthead: custom variable sans with removable modules.
– Tagline: thin italic grotesque.
– Secondary copy: 10 pt monospaced to reference code.

• Print Finishing
– Soft-touch matte laminate overall.
– Spot UV + holographic foil on masthead, mask outline and glitch shards.

Image-Generation Prompt (copy directly)
Generate a vertical magazine cover, 1024×1536 px, 300 ppi. Photorealistic editorial style.
Scene: shoulders-up portrait of an androgynous, ethnically ambiguous high-fashion model against a charcoal-to-light-gray gradient background with faint modular grid lines and translucent data glyphs. Lighting: soft frontal key, subtle dual rim lights, creating high-contrast grayscale tones.
Subject wears a semi-transparent, holographic polygonal augmented-reality mask; mask projects three slightly offset ghost faces with alternative eyes, noses, mouths, as luminous layers. Edges of the mask emit iridescent light (gradient #00eaff → #c400ff → #38ffab) and subtle pixel-sorting glitch streaks.
Masthead “MUSE MODULAR” top-center, uppercase, extra-condensed modular sans serif, holographic foil effect, breaking plane behind model’s head. Directly below, thin italic tagline “Who are you today?”. Bottom left, small monospaced caption “Future of Identity Issue”.
Overall palette strictly grayscale except selective holographic highlights. Emphasize negative space, pristine editorial composition, futuristic mood, crisp detail suitable for print.

`
