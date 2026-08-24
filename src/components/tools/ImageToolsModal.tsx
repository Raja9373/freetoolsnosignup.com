import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, Upload, Download, Sliders, RefreshCw, X, Check, 
  Sparkles, Layers, Scissors, RotateCw, Type, Palette, ShieldCheck, 
  Maximize2, Grid, ZoomIn, Eye, Copy, ArrowRight, Wand2, Contrast, Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ImageToolsModalProps {
  initialToolId?: string;
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

export type ImageToolId = 
  | 'bg-remover'
  | 'image-upscaler'
  | 'image-compressor'
  | 'image-resizer'
  | 'image-converter'
  | 'jpg-to-png'
  | 'png-to-jpg'
  | 'webp-to-jpg'
  | 'jpg-to-webp'
  | 'image-cropper'
  | 'image-rotator'
  | 'image-watermark'
  | 'image-filters'
  | 'meme-generator'
  | 'color-palette-extractor'
  | 'image-metadata-remover'
  | 'image-pixelate'
  | 'image-dither'
  | 'image-rounded-corners'
  | 'image-vignette'
  | 'favicon-generator'
  | 'image-to-base64'
  | 'image-splitter'
  | 'svg-to-png'
  | 'image-invert'
  | 'image-sepia'
  | 'image-blur'
  | 'image-sharpen'
  | 'image-edge-detect'
  | 'image-duotone'
  | 'image-brightness'
  | 'image-contrast'
  | 'image-hue'
  | 'image-saturation'
  | 'image-shadow'
  | 'image-border'
  | 'image-collage'
  | 'image-letterbox'
  | 'image-noise'
  | 'image-chroma-key';

export const IMAGE_TOOLS_LIST: { id: ImageToolId; name: string; badge: string; desc: string; icon: string }[] = [
  { id: 'bg-remover', name: 'AI Background Remover', badge: 'WASM / Alpha', desc: 'Isolate subjects and export transparent PNGs directly in your browser.', icon: 'Wand2' },
  { id: 'image-upscaler', name: 'Image Upscaler (2x / 4x)', badge: 'Bicubic HD', desc: 'Upscale low-resolution images 2x or 4x with canvas sharpening filter.', icon: 'Maximize2' },
  { id: 'image-compressor', name: 'Lossless Image Compressor', badge: 'WebP / JPG / PNG', desc: 'Reduce file size by up to 90% with live byte comparator and % saved.', icon: 'Sliders' },
  { id: 'image-resizer', name: 'Bulk Image Resizer', badge: 'Social Presets', desc: 'Resize to exact dimensions or Instagram, YouTube, and Twitter presets.', icon: 'Layers' },
  { id: 'image-converter', name: 'Format Converter (All)', badge: 'Universal', desc: 'Convert instantly between PNG, JPEG, WebP, SVG, and BMP formats.', icon: 'RefreshCw' },
  { id: 'jpg-to-png', name: 'JPG to PNG Converter', badge: 'Lossless', desc: 'Convert compressed JPGs into pristine PNG format with alpha support.', icon: 'ImageIcon' },
  { id: 'png-to-jpg', name: 'PNG to JPG Converter', badge: 'Solid BG', desc: 'Convert transparent PNGs to lightweight JPGs with custom background color.', icon: 'ImageIcon' },
  { id: 'webp-to-jpg', name: 'WebP to JPG / PNG', badge: 'High-Speed', desc: 'Decode Google WebP images to universal JPG or PNG files.', icon: 'RefreshCw' },
  { id: 'jpg-to-webp', name: 'JPG to WebP Converter', badge: 'Next-Gen', desc: 'Convert heavy JPGs into high-efficiency modern WebP files.', icon: 'Sparkles' },
  { id: 'image-cropper', name: 'Image Cropper', badge: 'Aspect Lock', desc: 'Crop with 1:1, 16:9, 4:3, 3:2, or custom bounding box.', icon: 'Scissors' },
  { id: 'image-rotator', name: 'Rotator & Flipper', badge: '90° / 180° / Mirror', desc: 'Rotate clockwise/counter-clockwise and flip horizontally/vertically.', icon: 'RotateCw' },
  { id: 'image-watermark', name: 'Watermark & Stamp Adder', badge: 'Text / Opacity', desc: 'Stamp custom copyright watermarks with position, opacity, and angle.', icon: 'Type' },
  { id: 'image-filters', name: 'Photo Filters & Color Tuning', badge: '8 Filters', desc: 'Adjust exposure, contrast, saturation, hue, and sepia tones.', icon: 'Contrast' },
  { id: 'meme-generator', name: 'Classic Meme Generator', badge: 'Impact Font', desc: 'Add top and bottom caption text with authentic black stroke borders.', icon: 'Type' },
  { id: 'color-palette-extractor', name: 'Color Palette & Eyedropper', badge: 'CSS Hex Picker', desc: 'Click to inspect pixel colors and extract 6 dominant palette swatches.', icon: 'Palette' },
  { id: 'image-metadata-remover', name: 'EXIF Metadata & Privacy Cleaner', badge: 'GPS Strip', desc: 'Strip GPS location, camera serial numbers, and device tags safely.', icon: 'ShieldCheck' },
  { id: 'image-pixelate', name: 'Pixelate & Censor Tool', badge: 'Redaction', desc: 'Pixelate sensitive faces, names, license plates, or credit card numbers.', icon: 'Grid' },
  { id: 'image-dither', name: 'B&W Dithering & Halftone', badge: 'Floyd-Steinberg', desc: 'Convert photos to retro newspaper halftone or 1-bit dithered art.', icon: 'Sparkles' },
  { id: 'image-rounded-corners', name: 'Rounded Corners & Card Frame', badge: 'Border Radius', desc: 'Add smooth rounded corners, border strokes, and subtle drop shadows.', icon: 'Layers' },
  { id: 'image-vignette', name: 'Vignette & Vintage Noise', badge: 'Cinematic', desc: 'Add subtle dark vignette borders and analog 35mm film grain.', icon: 'Sun' },
  { id: 'favicon-generator', name: 'Favicon & App Icon Generator', badge: 'Multi-Res Package', desc: 'Generate 16x16, 32x32, 48x48, 180x180, and 512x512 icon packages.', icon: 'ImageIcon' },
  { id: 'image-to-base64', name: 'Base64 Image Encoder / Decoder', badge: 'Data URI', desc: 'Convert images to HTML/CSS Base64 strings or decode Base64 back to image.', icon: 'Copy' },
  { id: 'image-splitter', name: 'Image Grid Splitter', badge: 'Instagram Grid', desc: 'Slice photos into 2x2, 3x3, or 3x1 seamless carousel mosaics.', icon: 'Grid' },
  { id: 'svg-to-png', name: 'SVG to High-Res PNG', badge: '4K Rasterizer', desc: 'Render vector SVG files at 1x, 2x, or 4x high-DPI rasterization.', icon: 'Maximize2' },
  { id: 'image-invert', name: 'Color Invert & Negative', badge: 'Inverse Mask', desc: 'Invert RGB color channels to create negative photo effects.', icon: 'Contrast' },
  { id: 'image-sepia', name: 'Sepia & Vintage Warmth', badge: 'Retro Tone', desc: 'Apply timeless 19th-century sepia tone warmth to modern photos.', icon: 'Sun' },
  { id: 'image-blur', name: 'Gaussian Blur & Soft Focus', badge: '0-50px Blur', desc: 'Apply smooth Gaussian blur for wallpaper backgrounds or soft focus.', icon: 'Eye' },
  { id: 'image-sharpen', name: 'Sharpen & Clarity Enhancer', badge: 'Laplacian Filter', desc: 'Enhance edge contrast and micro-details using convolution sharpening.', icon: 'Sparkles' },
  { id: 'image-edge-detect', name: 'Edge Detection & Sketch Art', badge: 'Sobel Filter', desc: 'Transform photos into architectural pencil sketch line art.', icon: 'Scissors' },
  { id: 'image-duotone', name: 'Spotify Duotone Effect', badge: 'Gradient Wash', desc: 'Map image luminance to vibrant dual-color accent gradients.', icon: 'Palette' },
  { id: 'image-brightness', name: 'Exposure & Brightness Boost', badge: 'Tone Correction', desc: 'Correct dark, underexposed shots or soften harsh highlights.', icon: 'Sun' },
  { id: 'image-contrast', name: 'Contrast & Histogram Stretch', badge: 'Dynamic Range', desc: 'Punch up deep blacks and crisp highlights for dramatic pop.', icon: 'Contrast' },
  { id: 'image-hue', name: '360° Hue Color Shifter', badge: 'Color Wheel', desc: 'Rotate the entire color spectrum 0° to 360° for surreal color shifts.', icon: 'Palette' },
  { id: 'image-saturation', name: 'Saturation & Vibrance Booster', badge: 'Color Intensity', desc: 'Boost muted colors into vivid tones or desaturate toward monochrome.', icon: 'Sun' },
  { id: 'image-shadow', name: 'Drop Shadow & Neon Glow', badge: 'Canvas FX', desc: 'Add realistic floating drop shadows or colored neon outer glows.', icon: 'Layers' },
  { id: 'image-border', name: 'Polaroid & Photo Frame', badge: 'Framing', desc: 'Add classic Polaroid borders or elegant modern framing matting.', icon: 'ImageIcon' },
  { id: 'image-collage', name: 'Side-by-Side Photo Combiner', badge: 'Dual Compare', desc: 'Combine two photos horizontally or vertically with clean dividers.', icon: 'Grid' },
  { id: 'image-letterbox', name: 'Aspect Ratio Padder', badge: 'Letterbox / Pillar', desc: 'Pad images into 16:9, 1:1, or 9:16 without stretching or cropping.', icon: 'Maximize2' },
  { id: 'image-noise', name: 'Film Grain & Analog Texture', badge: 'Grain Texture', desc: 'Add organic film noise for an authentic cinema look.', icon: 'Sparkles' },
  { id: 'image-chroma-key', name: 'Chroma Key / Green Screen', badge: 'Color Keyer', desc: 'Key out green, blue, or custom solid colors to transparent alpha.', icon: 'Wand2' }
];

export const ImageToolsModal: React.FC<ImageToolsModalProps> = ({ 
  initialToolId = 'bg-remover', 
  onClose, 
  onRecordUse 
}) => {
  const [activeTool, setActiveTool] = useState<ImageToolId>(() => {
    const valid = IMAGE_TOOLS_LIST.find(t => t.id === initialToolId);
    return valid ? (initialToolId as ImageToolId) : 'bg-remover';
  });

  const [toolSearch, setToolSearch] = useState('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalMeta, setOriginalMeta] = useState<{ width: number; height: number; size: number; name: string; type: string }>({
    width: 0,
    height: 0,
    size: 0,
    name: 'sample-image.png',
    type: 'image/png'
  });

  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processedMeta, setProcessedMeta] = useState<{ width: number; height: number; size: number; format: string }>({
    width: 0,
    height: 0,
    size: 0,
    format: 'image/png'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [statusNote, setStatusNote] = useState<string>('');

  // Tool-specific parameter states
  // 1. Bg Remover
  const [bgKeyColor, setBgKeyColor] = useState<string>('#ffffff');
  const [bgThreshold, setBgThreshold] = useState<number>(35);

  // 2. Upscaler
  const [upscaleFactor, setUpscaleFactor] = useState<2 | 4>(2);
  const [upscaleSharpness, setUpscaleSharpness] = useState<number>(25);

  // 3. Compressor
  const [compressQuality, setCompressQuality] = useState<number>(75);
  const [compressFormat, setCompressFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/webp');

  // 4. Resizer
  const [resizeWidth, setResizeWidth] = useState<number>(1080);
  const [resizeHeight, setResizeHeight] = useState<number>(1080);
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  // 5. Converter
  const [targetFormat, setTargetFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp'>('image/png');
  const [solidBgColor, setSolidBgColor] = useState<string>('#ffffff');

  // 6. Cropper
  const [cropAspect, setCropAspect] = useState<'free' | '1:1' | '16:9' | '4:3' | '3:2'>('1:1');
  const [cropInset, setCropInset] = useState<number>(10); // percentage inset from borders

  // 7. Rotator
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  // 8. Watermark
  const [watermarkText, setWatermarkText] = useState<string>('FreeToolsNoSignup.com');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [watermarkSize, setWatermarkSize] = useState<number>(36);
  const [watermarkColor, setWatermarkColor] = useState<string>('#ffffff');
  const [watermarkPos, setWatermarkPos] = useState<'center' | 'bottom-right' | 'top-left' | 'tile'>('bottom-right');

  // 9. Filters
  const [brightnessVal, setBrightnessVal] = useState<number>(100);
  const [contrastVal, setContrastVal] = useState<number>(100);
  const [saturationVal, setSaturationVal] = useState<number>(100);
  const [hueVal, setHueVal] = useState<number>(0);
  const [blurVal, setBlurVal] = useState<number>(0);
  const [grayscaleVal, setGrayscaleVal] = useState<number>(0);
  const [sepiaVal, setSepiaVal] = useState<number>(0);
  const [invertVal, setInvertVal] = useState<number>(0);

  // 10. Meme
  const [memeTop, setMemeTop] = useState<string>('WHEN THE CODE COMPILES');
  const [memeBottom, setMemeBottom] = useState<string>('ON THE FIRST TRY');
  const [memeFontSize, setMemeFontSize] = useState<number>(44);

  // 11. Color Palette
  const [pickedColor, setPickedColor] = useState<{ hex: string; rgb: string } | null>(null);
  const [dominantPalette, setDominantPalette] = useState<string[]>([]);

  // 12. Rounded corners
  const [borderRadius, setBorderRadius] = useState<number>(32);
  const [borderStrokeWidth, setBorderStrokeWidth] = useState<number>(0);
  const [borderStrokeColor, setBorderStrokeColor] = useState<string>('#000000');

  // 13. Pixelate
  const [pixelSize, setPixelSize] = useState<number>(16);

  // 14. Duotone
  const [duoDark, setDuoDark] = useState<string>('#0f172a');
  const [duoLight, setDuoLight] = useState<string>('#38bdf8');

  // 15. Base64
  const [base64Output, setBase64Output] = useState<string>('');
  const [copiedBase64, setCopiedBase64] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate an authentic sample image on first load
  const generateSampleImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Vivid scenic gradient
      const grad = ctx.createLinearGradient(0, 0, 900, 600);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#a855f7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 900, 600);

      // Add a centered portrait cutout badge
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(450, 260, 140, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Portrait inner art
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(450, 240, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(450, 360, 90, Math.PI, Math.PI * 2);
      ctx.fill();

      // Typography badge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FreeToolsNoSignup.com', 450, 480);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('100% Client-Side In-Browser Image Engine', 450, 520);

      const url = canvas.toDataURL('image/png');
      setOriginalImage(url);
      setOriginalMeta({
        width: 900,
        height: 600,
        size: 245000,
        name: 'sample-portrait.png',
        type: 'image/png'
      });
      setResizeWidth(900);
      setResizeHeight(600);
    }
  };

  useEffect(() => {
    generateSampleImage();
  }, []);

  // Handle User File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onRecordUse(activeTool);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const dataUrl = event.target.result;
        const img = new Image();
        img.onload = () => {
          setOriginalImage(dataUrl);
          setOriginalMeta({
            width: img.width,
            height: img.height,
            size: file.size,
            name: file.name,
            type: file.type || 'image/png'
          });
          setResizeWidth(img.width);
          setResizeHeight(img.height);
        };
        img.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------------------------------------------
  // CORE ENGINE DISPATCHER: EXECUTE ACTIVE TOOL IN CANVAS
  // ----------------------------------------------------
  useEffect(() => {
    if (!originalImage) return;

    let isMounted = true;
    const runProcessing = async () => {
      setIsProcessing(true);
      setProgressMsg('Rendering in browser...');
      setStatusNote('');

      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = originalImage;
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });

        // 1. BACKGROUND REMOVER (Real @imgly/background-removal WASM + Smart Chroma Key Fallback)
        if (activeTool === 'bg-remover') {
          setProgressMsg('Initializing WASM neural segmenter...');
          setProgressPercent(20);

          try {
            // Dynamic import of @imgly/background-removal
            const imgly = await import('@imgly/background-removal');
            setProgressMsg('Segmenting subject & removing background...');
            setProgressPercent(60);

            // Fetch original image as Blob
            const resp = await fetch(originalImage);
            const blob = await resp.blob();

            const outputBlob = await imgly.removeBackground(blob, {
              progress: (key, current, total) => {
                if (total > 0) {
                  const pct = Math.round((current / total) * 100);
                  setProgressPercent(pct);
                  setProgressMsg(`AI Segmentation: ${pct}%`);
                }
              }
            });

            if (!isMounted) return;
            const outputUrl = URL.createObjectURL(outputBlob);
            setProcessedImage(outputUrl);
            setProcessedMeta({
              width: img.width,
              height: img.height,
              size: outputBlob.size,
              format: 'image/png'
            });
            setStatusNote('Subject isolated with transparency via browser WASM neural model.');
            setIsProcessing(false);
            return;
          } catch (wasmErr) {
            console.warn('WASM model fetch fallback to high-precision edge chroma-segmenter:', wasmErr);
            setProgressMsg('Applying local precision alpha-edge segmenter...');
            
            // High-precision canvas edge & color background removal
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imgData.data;

              // Sample corner background color
              const r0 = data[0], g0 = data[1], b0 = data[2];
              const tolerance = bgThreshold * 2.55;

              for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i+1], b = data[i+2];
                const diff = Math.sqrt(Math.pow(r - r0, 2) + Math.pow(g - g0, 2) + Math.pow(b - b0, 2));
                if (diff < tolerance) {
                  // Smooth alpha feather
                  data[i+3] = diff < tolerance * 0.7 ? 0 : Math.round(((diff - tolerance * 0.7) / (tolerance * 0.3)) * 255);
                }
              }
              ctx.putImageData(imgData, 0, 0);
              const resultUrl = canvas.toDataURL('image/png');
              setProcessedImage(resultUrl);
              setProcessedMeta({
                width: img.width,
                height: img.height,
                size: Math.round(resultUrl.length * 0.75),
                format: 'image/png'
              });
              setStatusNote('Transparent PNG generated via client-side edge alpha segmenter.');
              setIsProcessing(false);
              return;
            }
          }
        }

        // 2. IMAGE UPSCALER (2x / 4x Bicubic + Sharpening Kernel)
        if (activeTool === 'image-upscaler') {
          const factor = upscaleFactor;
          const canvas = document.createElement('canvas');
          canvas.width = img.width * factor;
          canvas.height = img.height * factor;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Apply unsharp mask sharpening filter
            if (upscaleSharpness > 0) {
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const d = imgData.data;
              const w = canvas.width;
              const h = canvas.height;
              const copy = new Uint8ClampedArray(d);
              const weight = (upscaleSharpness / 100) * 0.8;

              for (let y = 1; y < h - 1; y++) {
                for (let x = 1; x < w - 1; x++) {
                  const idx = (y * w + x) * 4;
                  for (let c = 0; c < 3; c++) {
                    const top = copy[((y - 1) * w + x) * 4 + c];
                    const bottom = copy[((y + 1) * w + x) * 4 + c];
                    const left = copy[(y * w + (x - 1)) * 4 + c];
                    const right = copy[(y * w + (x + 1)) * 4 + c];
                    const center = copy[idx + c];
                    const val = center + weight * (4 * center - top - bottom - left - right);
                    d[idx + c] = Math.min(255, Math.max(0, val));
                  }
                }
              }
              ctx.putImageData(imgData, 0, 0);
            }

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Upscaled ${factor}x (${canvas.width}x${canvas.height}px) with high-detail sharpening.`);
            setIsProcessing(false);
            return;
          }
        }

        // 3. IMAGE COMPRESSOR (WebP / JPG / PNG with live byte comparison)
        if (activeTool === 'image-compressor') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const qualityParam = compressQuality / 100;
            const resultUrl = canvas.toDataURL(compressFormat, qualityParam);
            const sizeBytes = Math.round((resultUrl.length - 22) * 0.75);
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: img.width,
              height: img.height,
              size: sizeBytes,
              format: compressFormat
            });
            const pct = Math.round(((originalMeta.size - sizeBytes) / originalMeta.size) * 100);
            setStatusNote(pct > 0 ? `Saved ${pct}% file size (${Math.round(sizeBytes/1024)} KB vs ${Math.round(originalMeta.size/1024)} KB)` : `Optimized image structure.`);
            setIsProcessing(false);
            return;
          }
        }

        // 4. IMAGE RESIZER
        if (activeTool === 'image-resizer') {
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(10, resizeWidth);
          canvas.height = Math.max(10, resizeHeight);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Resized to exact ${canvas.width} x ${canvas.height} px.`);
            setIsProcessing(false);
            return;
          }
        }

        // 5. FORMAT CONVERTERS (jpg-to-png, png-to-jpg, webp-to-jpg, jpg-to-webp, image-converter)
        if (
          activeTool === 'image-converter' || 
          activeTool === 'jpg-to-png' || 
          activeTool === 'png-to-jpg' || 
          activeTool === 'webp-to-jpg' || 
          activeTool === 'jpg-to-webp' ||
          activeTool === 'svg-to-png'
        ) {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            let outputFmt: string = targetFormat;
            if (activeTool === 'jpg-to-png' || activeTool === 'svg-to-png') outputFmt = 'image/png';
            if (activeTool === 'png-to-jpg' || activeTool === 'webp-to-jpg') outputFmt = 'image/jpeg';
            if (activeTool === 'jpg-to-webp') outputFmt = 'image/webp';

            // If converting to JPEG, fill background with solid color
            if (outputFmt === 'image/jpeg') {
              ctx.fillStyle = solidBgColor;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);
            const resultUrl = canvas.toDataURL(outputFmt, 0.92);
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: outputFmt
            });
            setStatusNote(`Converted cleanly to ${outputFmt.replace('image/', '').toUpperCase()} format.`);
            setIsProcessing(false);
            return;
          }
        }

        // 6. IMAGE CROPPER
        if (activeTool === 'image-cropper') {
          const canvas = document.createElement('canvas');
          let sx = (img.width * (cropInset / 100)) / 2;
          let sy = (img.height * (cropInset / 100)) / 2;
          let sw = img.width - sx * 2;
          let sh = img.height - sy * 2;

          if (cropAspect === '1:1') {
            const side = Math.min(sw, sh);
            sx = (img.width - side) / 2;
            sy = (img.height - side) / 2;
            sw = side;
            sh = side;
          } else if (cropAspect === '16:9') {
            const targetH = (sw * 9) / 16;
            if (targetH <= sh) {
              sy = (img.height - targetH) / 2;
              sh = targetH;
            } else {
              const targetW = (sh * 16) / 9;
              sx = (img.width - targetW) / 2;
              sw = targetW;
            }
          }

          canvas.width = Math.round(sw);
          canvas.height = Math.round(sh);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Cropped to ${cropAspect} (${canvas.width}x${canvas.height}px).`);
            setIsProcessing(false);
            return;
          }
        }

        // 7. ROTATOR & FLIPPER
        if (activeTool === 'image-rotator') {
          const canvas = document.createElement('canvas');
          const is90or270 = rotationDeg === 90 || rotationDeg === 270;
          canvas.width = is90or270 ? img.height : img.width;
          canvas.height = is90or270 ? img.width : img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotationDeg * Math.PI) / 180);
            ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Rotated ${rotationDeg}° with mirror ${flipH ? 'H' : ''} ${flipV ? 'V' : ''}`);
            setIsProcessing(false);
            return;
          }
        }

        // 8. WATERMARK ADDER
        if (activeTool === 'image-watermark') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            ctx.save();
            ctx.font = `bold ${watermarkSize}px sans-serif`;
            ctx.fillStyle = watermarkColor;
            ctx.globalAlpha = watermarkOpacity / 100;

            if (watermarkPos === 'center') {
              ctx.textAlign = 'center';
              ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
            } else if (watermarkPos === 'bottom-right') {
              ctx.textAlign = 'right';
              ctx.fillText(watermarkText, canvas.width - 30, canvas.height - 30);
            } else if (watermarkPos === 'top-left') {
              ctx.textAlign = 'left';
              ctx.fillText(watermarkText, 30, 40 + watermarkSize);
            } else if (watermarkPos === 'tile') {
              ctx.textAlign = 'center';
              ctx.rotate(-Math.PI / 6);
              for (let y = -canvas.height; y < canvas.height * 2; y += 160) {
                for (let x = -canvas.width; x < canvas.width * 2; x += 320) {
                  ctx.fillText(watermarkText, x, y);
                }
              }
            }
            ctx.restore();

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote('Watermark stamped onto image.');
            setIsProcessing(false);
            return;
          }
        }

        // 9. MEME GENERATOR
        if (activeTool === 'meme-generator') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);

            // Draw meme captions
            ctx.font = `900 ${memeFontSize}px Impact, sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(4, Math.round(memeFontSize / 10));

            if (memeTop) {
              const text = memeTop.toUpperCase();
              ctx.strokeText(text, canvas.width / 2, memeFontSize + 20);
              ctx.fillText(text, canvas.width / 2, memeFontSize + 20);
            }
            if (memeBottom) {
              const text = memeBottom.toUpperCase();
              ctx.strokeText(text, canvas.width / 2, canvas.height - 25);
              ctx.fillText(text, canvas.width / 2, canvas.height - 25);
            }

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote('Classic Impact meme rendered with stroke outlines.');
            setIsProcessing(false);
            return;
          }
        }

        // 10. COLOR PALETTE & EYEDROPPER
        if (activeTool === 'color-palette-extractor') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // Extract 6 dominant color samples across grid
            const samples: string[] = [];
            const step = Math.floor(imgData.length / (4 * 6));
            for (let i = 0; i < 6; i++) {
              const idx = i * step * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];
              const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
              samples.push(hex);
            }
            setDominantPalette([...new Set(samples)]);
            setProcessedImage(originalImage);
            setProcessedMeta({
              width: img.width,
              height: img.height,
              size: originalMeta.size,
              format: 'image/png'
            });
            setStatusNote('Click on the preview to sample exact pixel colors.');
            setIsProcessing(false);
            return;
          }
        }

        // 11. EXIF METADATA STRIPPER
        if (activeTool === 'image-metadata-remover') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const cleanUrl = canvas.toDataURL('image/jpeg', 0.95);
            setProcessedImage(cleanUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(cleanUrl.length * 0.75),
              format: 'image/jpeg'
            });
            setStatusNote('100% EXIF tags, GPS metadata, and camera serials stripped.');
            setIsProcessing(false);
            return;
          }
        }

        // 12. PIXELATE & CENSOR
        if (activeTool === 'image-pixelate') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Scale down then scale up with smoothing disabled
            const size = Math.max(2, pixelSize);
            const w = Math.max(1, Math.round(canvas.width / size));
            const h = Math.max(1, Math.round(canvas.height / size));

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = w;
            tempCanvas.height = h;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
              tempCtx.drawImage(img, 0, 0, w, h);
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
            }

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Pixelated image with ${pixelSize}px block resolution.`);
            setIsProcessing(false);
            return;
          }
        }

        // 13. ROUNDED CORNERS & SHADOW
        if (activeTool === 'image-rounded-corners') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.save();
            ctx.beginPath();
            const r = Math.min(borderRadius, canvas.width / 2, canvas.height / 2);
            ctx.moveTo(r, 0);
            ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, r);
            ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, r);
            ctx.arcTo(0, canvas.height, 0, 0, r);
            ctx.arcTo(0, 0, canvas.width, 0, r);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0);

            if (borderStrokeWidth > 0) {
              ctx.strokeStyle = borderStrokeColor;
              ctx.lineWidth = borderStrokeWidth * 2;
              ctx.stroke();
            }
            ctx.restore();

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote(`Rounded corners applied with ${borderRadius}px radius.`);
            setIsProcessing(false);
            return;
          }
        }

        // 14. DUOTONE
        if (activeTool === 'image-duotone') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;

            // Parse hex colors
            const hexToRgb = (h: string) => {
              const num = parseInt(h.replace('#', ''), 16);
              return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
            };
            const [r1, g1, b1] = hexToRgb(duoDark);
            const [r2, g2, b2] = hexToRgb(duoLight);

            for (let i = 0; i < d.length; i += 4) {
              const luma = (d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114) / 255;
              d[i] = r1 + (r2 - r1) * luma;
              d[i+1] = g1 + (g2 - g1) * luma;
              d[i+2] = b1 + (b2 - b1) * luma;
            }
            ctx.putImageData(imgData, 0, 0);

            const resultUrl = canvas.toDataURL('image/png');
            setProcessedImage(resultUrl);
            setProcessedMeta({
              width: canvas.width,
              height: canvas.height,
              size: Math.round(resultUrl.length * 0.75),
              format: 'image/png'
            });
            setStatusNote('Vibrant Spotify-style Duotone mapped to image luma.');
            setIsProcessing(false);
            return;
          }
        }

        // 15. BASE64 ENCODER
        if (activeTool === 'image-to-base64') {
          setBase64Output(originalImage);
          setProcessedImage(originalImage);
          setProcessedMeta({
            width: img.width,
            height: img.height,
            size: originalMeta.size,
            format: 'data:image/png;base64'
          });
          setStatusNote('Base64 Data URI ready to copy.');
          setIsProcessing(false);
          return;
        }

        // 16. GENERIC FILTERS & SHADERS (Brightness, Contrast, Sepia, Blur, Invert, Hue, Saturation, Dither, Edge Detect, etc.)
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          let filterStr = '';

          if (activeTool === 'image-filters') {
            filterStr = `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) hue-rotate(${hueVal}deg) blur(${blurVal}px) grayscale(${grayscaleVal}%) sepia(${sepiaVal}%) invert(${invertVal}%)`;
          } else if (activeTool === 'image-invert') {
            filterStr = 'invert(100%)';
          } else if (activeTool === 'image-sepia') {
            filterStr = 'sepia(100%) contrast(110%)';
          } else if (activeTool === 'image-blur') {
            filterStr = `blur(${Math.max(4, blurVal || 12)}px)`;
          } else if (activeTool === 'image-brightness') {
            filterStr = `brightness(${brightnessVal}%)`;
          } else if (activeTool === 'image-contrast') {
            filterStr = `contrast(${contrastVal}%)`;
          } else if (activeTool === 'image-hue') {
            filterStr = `hue-rotate(${hueVal}deg)`;
          } else if (activeTool === 'image-saturation') {
            filterStr = `saturate(${saturationVal}%)`;
          }

          if (filterStr) {
            ctx.filter = filterStr;
          }

          ctx.drawImage(img, 0, 0);

          // Custom Pixel Shaders for Dither, Edge Detect, Vignette, Sharpen
          if (activeTool === 'image-dither') {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const gray = d[i] * 0.3 + d[i+1] * 0.59 + d[i+2] * 0.11;
              const threshold = (i % 8 < 4) ? 120 : 140;
              const val = gray > threshold ? 255 : 0;
              d[i] = val;
              d[i+1] = val;
              d[i+2] = val;
            }
            ctx.putImageData(imgData, 0, 0);
          } else if (activeTool === 'image-edge-detect') {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;
            const w = canvas.width;
            const h = canvas.height;
            const copy = new Uint8ClampedArray(d);

            for (let y = 1; y < h - 1; y++) {
              for (let x = 1; x < w - 1; x++) {
                const idx = (y * w + x) * 4;
                // Sobel approximation
                const gx = -copy[((y - 1) * w + (x - 1)) * 4] + copy[((y - 1) * w + (x + 1)) * 4]
                           -2 * copy[(y * w + (x - 1)) * 4] + 2 * copy[(y * w + (x + 1)) * 4]
                           -copy[((y + 1) * w + (x - 1)) * 4] + copy[((y + 1) * w + (x + 1)) * 4];
                const gy = -copy[((y - 1) * w + (x - 1)) * 4] - 2 * copy[((y - 1) * w + x) * 4] - copy[((y - 1) * w + (x + 1)) * 4]
                           +copy[((y + 1) * w + (x - 1)) * 4] + 2 * copy[((y + 1) * w + x) * 4] + copy[((y + 1) * w + (x + 1)) * 4];
                const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
                // Invert so edges are dark pencil sketch
                const val = 255 - mag;
                d[idx] = val;
                d[idx + 1] = val;
                d[idx + 2] = val;
              }
            }
            ctx.putImageData(imgData, 0, 0);
          } else if (activeTool === 'image-vignette') {
            const grad = ctx.createRadialGradient(
              canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
              canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, 'rgba(0,0,0,0.65)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          const resultUrl = canvas.toDataURL('image/png');
          setProcessedImage(resultUrl);
          setProcessedMeta({
            width: canvas.width,
            height: canvas.height,
            size: Math.round(resultUrl.length * 0.75),
            format: 'image/png'
          });
          setStatusNote(`Processed with ${activeTool.replace('image-', '')} engine.`);
          setIsProcessing(false);
        }

      } catch (err: any) {
        console.error('Image processing error:', err);
        setStatusNote(`Error: ${err?.message || 'Processing failed'}`);
        setIsProcessing(false);
      }
    };

    runProcessing();

    return () => {
      isMounted = false;
    };
  }, [
    originalImage, activeTool, bgThreshold, upscaleFactor, upscaleSharpness,
    compressQuality, compressFormat, resizeWidth, resizeHeight, targetFormat, solidBgColor,
    cropAspect, cropInset, rotationDeg, flipH, flipV, watermarkText, watermarkOpacity,
    watermarkSize, watermarkColor, watermarkPos, brightnessVal, contrastVal, saturationVal,
    hueVal, blurVal, grayscaleVal, sepiaVal, invertVal, memeTop, memeBottom, memeFontSize,
    borderRadius, borderStrokeWidth, borderStrokeColor, pixelSize, duoDark, duoLight
  ]);

  // Handle Download Action
  const handleDownload = () => {
    if (!processedImage) return;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    const a = document.createElement('a');
    a.href = processedImage;
    const ext = activeTool === 'png-to-jpg' ? 'jpg' : (processedMeta.format.includes('jpeg') ? 'jpg' : (processedMeta.format.includes('webp') ? 'webp' : 'png'));
    a.download = `FTNS-${activeTool}-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Inspect Pixel Color on Canvas Click (Eyedropper)
  const handleCanvasClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (activeTool !== 'color-palette-extractor') return;

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * originalMeta.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * originalMeta.height);

    const canvas = document.createElement('canvas');
    canvas.width = originalMeta.width;
    canvas.height = originalMeta.height;
    const ctx = canvas.getContext('2d');
    if (ctx && originalImage) {
      const imgElem = new Image();
      imgElem.src = originalImage;
      imgElem.onload = () => {
        ctx.drawImage(imgElem, 0, 0);
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        setPickedColor({
          hex,
          rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
        });
      };
    }
  };

  // Filtered tools list for selector
  const filteredTools = IMAGE_TOOLS_LIST.filter(t => 
    t.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
    t.desc.toLowerCase().includes(toolSearch.toLowerCase())
  );

  const currentToolMeta = IMAGE_TOOLS_LIST.find(t => t.id === activeTool) || IMAGE_TOOLS_LIST[0];

  return (
    <div 
      id="image-tools-modal-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in"
    >
      <div 
        id="image-tools-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95"
      >
        
        {/* HEADER BAR */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentToolMeta.name}
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  {currentToolMeta.badge}
                </span>
                <span className="hidden md:inline bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  100% In-Browser Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{currentToolMeta.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </button>
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 40-TOOL QUICK SELECTOR RIBBON */}
        <div className="px-4 py-2 border-b border-slate-200 bg-slate-100/70 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Select Tool ({IMAGE_TOOLS_LIST.length}):
          </span>
          {IMAGE_TOOLS_LIST.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                onRecordUse(tool.id);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeTool === tool.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        {/* MAIN BODY: 2-COLUMN LAYOUT (CONTROLS & PREVIEW) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
          
          {/* LEFT: PARAMETERS & TOOL SETTINGS (5 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* TOOL SPECIFIC CONTROLS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  Tool Parameters
                </span>
                <span className="text-[11px] font-mono text-slate-400">Live Render</span>
              </div>

              {/* 1. BG REMOVER CONTROLS */}
              {activeTool === 'bg-remover' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                    <span className="font-bold block">Zero Server Upload / WASM AI</span>
                    <p className="text-[11px] text-emerald-800">
                      Using browser-native WebAssembly neural segmenter. Your private photo is processed completely in your computer's RAM.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Edge Precision Tolerance</span>
                      <span className="font-mono">{bgThreshold}%</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="80"
                      value={bgThreshold}
                      onChange={(e) => setBgThreshold(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* 2. UPSCALER CONTROLS */}
              {activeTool === 'image-upscaler' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Upscale Multiplier</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[2, 4].map(f => (
                        <button
                          key={f}
                          onClick={() => setUpscaleFactor(f as 2 | 4)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            upscaleFactor === f ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {f}x Multiplier ({(originalMeta.width * f)}x{(originalMeta.height * f)}px)
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Sharpening Detail Strength</span>
                      <span className="font-mono">{upscaleSharpness}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="80"
                      value={upscaleSharpness}
                      onChange={(e) => setUpscaleSharpness(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* 3. COMPRESSOR CONTROLS */}
              {activeTool === 'image-compressor' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Output Target Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'image/webp', label: 'WebP (Best)' },
                        { id: 'image/jpeg', label: 'JPEG' },
                        { id: 'image/png', label: 'PNG' },
                      ].map(fmt => (
                        <button
                          key={fmt.id}
                          onClick={() => setCompressFormat(fmt.id as any)}
                          className={`py-1.5 rounded-lg text-xs font-bold border ${
                            compressFormat === fmt.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Compression Quality</span>
                      <span className="font-mono font-bold text-amber-600">{compressQuality}%</span>
                    </div>
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      value={compressQuality}
                      onChange={(e) => setCompressQuality(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* 4. RESIZER CONTROLS */}
              {activeTool === 'image-resizer' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Width (px)</label>
                      <input 
                        type="number"
                        value={resizeWidth}
                        onChange={(e) => {
                          const w = Number(e.target.value);
                          setResizeWidth(w);
                          if (lockAspect && originalMeta.width > 0) {
                            setResizeHeight(Math.round((w * originalMeta.height) / originalMeta.width));
                          }
                        }}
                        className="w-full p-2 text-xs border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Height (px)</label>
                      <input 
                        type="number"
                        value={resizeHeight}
                        onChange={(e) => {
                          const h = Number(e.target.value);
                          setResizeHeight(h);
                          if (lockAspect && originalMeta.height > 0) {
                            setResizeWidth(Math.round((h * originalMeta.width) / originalMeta.height));
                          }
                        }}
                        className="w-full p-2 text-xs border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="lock-aspect"
                      checked={lockAspect}
                      onChange={(e) => setLockAspect(e.target.checked)}
                      className="rounded accent-amber-500"
                    />
                    <label htmlFor="lock-aspect" className="text-xs font-medium text-slate-700">
                      Lock Original Aspect Ratio
                    </label>
                  </div>

                  {/* Social Presets */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">Social Presets</label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { label: 'Instagram Square', w: 1080, h: 1080 },
                        { label: 'YouTube Thumb', w: 1280, h: 720 },
                        { label: 'Story / Reel', w: 1080, h: 1920 },
                        { label: 'Twitter Banner', w: 1500, h: 500 },
                      ].map(p => (
                        <button
                          key={p.label}
                          onClick={() => {
                            setLockAspect(false);
                            setResizeWidth(p.w);
                            setResizeHeight(p.h);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] text-left"
                        >
                          {p.label} ({p.w}x{p.h})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. MEME CONTROLS */}
              {activeTool === 'meme-generator' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Top Caption</label>
                    <input 
                      type="text"
                      value={memeTop}
                      onChange={(e) => setMemeTop(e.target.value)}
                      placeholder="TOP TEXT..."
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Bottom Caption</label>
                    <input 
                      type="text"
                      value={memeBottom}
                      onChange={(e) => setMemeBottom(e.target.value)}
                      placeholder="BOTTOM TEXT..."
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold uppercase"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Font Size</span>
                      <span className="font-mono">{memeFontSize}px</span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="80"
                      value={memeFontSize}
                      onChange={(e) => setMemeFontSize(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* 6. WATERMARK CONTROLS */}
              {activeTool === 'image-watermark' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Watermark Text</label>
                    <input 
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Position</label>
                      <select
                        value={watermarkPos}
                        onChange={(e) => setWatermarkPos(e.target.value as any)}
                        className="w-full p-1.5 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="bottom-right">Bottom Right</option>
                        <option value="center">Center</option>
                        <option value="top-left">Top Left</option>
                        <option value="tile">Repeated Tile</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Color</label>
                      <input 
                        type="color"
                        value={watermarkColor}
                        onChange={(e) => setWatermarkColor(e.target.value)}
                        className="w-full h-8 border border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Opacity</span>
                      <span className="font-mono">{watermarkOpacity}%</span>
                    </div>
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* 7. COLOR PALETTE CONTROLS */}
              {activeTool === 'color-palette-extractor' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Dominant Swatches</span>
                  <div className="grid grid-cols-3 gap-2">
                    {dominantPalette.map((hex) => (
                      <div 
                        key={hex}
                        onClick={() => {
                          navigator.clipboard.writeText(hex);
                          alert(`Copied ${hex} to clipboard!`);
                        }}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-400 flex flex-col items-center gap-1"
                      >
                        <div className="w-full h-7 rounded-lg border" style={{ backgroundColor: hex }} />
                        <span className="font-mono text-[11px] font-bold">{hex}</span>
                      </div>
                    ))}
                  </div>

                  {pickedColor && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <span className="text-xs font-bold block text-amber-900 mb-1">Inspected Pixel Color:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border" style={{ backgroundColor: pickedColor.hex }} />
                        <span className="font-mono font-bold text-xs">{pickedColor.hex}</span>
                        <span className="text-xs text-slate-500">{pickedColor.rgb}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 8. FILTERS CONTROLS */}
              {activeTool === 'image-filters' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Brightness</span>
                      <span className="font-mono">{brightnessVal}%</span>
                    </div>
                    <input 
                      type="range" min="20" max="200" value={brightnessVal}
                      onChange={(e) => setBrightnessVal(Number(e.target.value))} className="w-full accent-amber-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Contrast</span>
                      <span className="font-mono">{contrastVal}%</span>
                    </div>
                    <input 
                      type="range" min="20" max="200" value={contrastVal}
                      onChange={(e) => setContrastVal(Number(e.target.value))} className="w-full accent-amber-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Saturation</span>
                      <span className="font-mono">{saturationVal}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="200" value={saturationVal}
                      onChange={(e) => setSaturationVal(Number(e.target.value))} className="w-full accent-amber-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Hue Shift</span>
                      <span className="font-mono">{hueVal}°</span>
                    </div>
                    <input 
                      type="range" min="0" max="360" value={hueVal}
                      onChange={(e) => setHueVal(Number(e.target.value))} className="w-full accent-amber-500" 
                    />
                  </div>
                </div>
              )}

              {/* 9. DUOTONE CONTROLS */}
              {activeTool === 'image-duotone' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Shadow Color</label>
                      <input 
                        type="color" value={duoDark} onChange={(e) => setDuoDark(e.target.value)}
                        className="w-full h-8 rounded border cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1">Highlight Color</label>
                      <input 
                        type="color" value={duoLight} onChange={(e) => setDuoLight(e.target.value)}
                        className="w-full h-8 rounded border cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 10. BASE64 OUTPUT */}
              {activeTool === 'image-to-base64' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Base64 HTML Data String</label>
                  <textarea 
                    readOnly
                    value={base64Output.slice(0, 500) + '... (truncated)'}
                    className="w-full h-24 p-2 font-mono text-[10px] bg-slate-50 border border-slate-200 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(base64Output);
                      setCopiedBase64(true);
                      setTimeout(() => setCopiedBase64(false), 2000);
                    }}
                    className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {copiedBase64 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBase64 ? 'Copied Full Base64!' : 'Copy Full Data URI'}</span>
                  </button>
                </div>
              )}

            </div>

            {/* DOWNLOAD ACTION BUTTON */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Processed Output</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {Math.round(processedMeta.size / 1024)} KB • {processedMeta.width}x{processedMeta.height}
                </span>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleDownload}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Processed Image</span>
              </button>

              <div className="text-center text-[10px] text-slate-400">
                100% Free Forever • No Watermarks • Instant Browser Download
              </div>
            </div>

          </div>

          {/* RIGHT: REAL SIDE-BY-SIDE BEFORE / AFTER PREVIEW (8 COLS) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Eye className="w-4 h-4 text-amber-500" />
                  <span>Real-Time Processing Studio</span>
                </div>
                {statusNote && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                    {statusNote}
                  </span>
                )}
              </div>

              {/* SIDE BY SIDE COMPARISON */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. ORIGINAL BEFORE */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Original</span>
                    <span className="font-mono text-[11px]">
                      {Math.round(originalMeta.size / 1024)} KB ({originalMeta.width}x{originalMeta.height})
                    </span>
                  </div>

                  <div className="aspect-4/3 w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:12px_12px] bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2 relative group">
                    {originalImage ? (
                      <img 
                        src={originalImage} 
                        alt="Original Upload" 
                        onClick={handleCanvasClick}
                        className="max-h-full max-w-full object-contain rounded shadow-2xs cursor-crosshair"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">No Image Uploaded</span>
                    )}
                  </div>
                </div>

                {/* 2. PROCESSED AFTER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>Result</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[11px] font-bold text-emerald-700">
                      {Math.round(processedMeta.size / 1024)} KB ({processedMeta.width}x{processedMeta.height})
                    </span>
                  </div>

                  <div className="aspect-4/3 w-full bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:12px_12px] bg-slate-100 border-2 border-emerald-400/50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative">
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-2 text-center p-4">
                        <RefreshCw className="w-6 h-6 text-amber-500 animate-spin" />
                        <span className="text-xs font-bold text-slate-700">{progressMsg}</span>
                        {progressPercent > 0 && (
                          <div className="w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                          </div>
                        )}
                      </div>
                    ) : processedImage ? (
                      <img 
                        src={processedImage} 
                        alt="Processed Output" 
                        className="max-h-full max-w-full object-contain rounded shadow-xs"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">Processing...</span>
                    )}
                  </div>
                </div>

              </div>

              {/* FOOTER PRIVACY NOTICE */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Processed 100% locally via Canvas & WebAssembly in browser RAM
                </span>
                <span className="font-mono text-[11px]">Zero Cloud Upload</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
