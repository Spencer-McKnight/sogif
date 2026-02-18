/**
 * UI Components Index
 * 
 * Export all shared UI components for clean imports:
 * import { DatoImage, Card, Table } from '@/components/ui'
 * 
 * Also consider whether ShadCN has available componentry to utilise (particularly for inputs, loading and information framing)
 */

// DatoCMS Components
export { DatoImage, ImagePlaceholder } from './DatoImage'

// Brand
export { Logo } from './Logo'

// Design System Primitives
export { Button, ButtonLink, buttonVariants } from './button'
export { AppLink, appLinkVariants } from './app-link'
export { Container } from './container'
export { DisclaimerText } from './disclaimer-text'
export { Badge, badgeVariants } from './badge'
export { AppCard, appCardVariants } from './app-card'
export { SectionHeader } from './section-header'
export { SwiperControls } from './swiper-controls'

// Shadcn Components - Card
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card'

// Shadcn Components - Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table'

// Shadcn Components - Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

// Shadcn Components - Collapsible
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'

// Shadcn Components - Form
export { Input } from './input'
export { Label } from './label'
export { Slider } from './slider'

// Shadcn Components - Chart
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from './chart'

