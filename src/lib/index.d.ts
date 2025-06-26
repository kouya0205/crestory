import { IconType } from "react-icons";
import {
  LifeEventTag,
  Visibility,
  FamilyMembershipStatus,
} from "@prisma/client";

export interface NavItem {
  href: string;
  icon: IconType;
  label: string;
}

export interface MenuItem {
  label: string;
  href?: string;
  icon?: IconType;
  children?: MenuItem[];
  disabled?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface StoryFormData {
  title: string;
  body: string;
  eventDate?: Date;
  lifeEventTag?: LifeEventTag;
  visibility: Visibility;
  images?: File[];
}

export interface StoryWithDetails {
  id: string;
  title: string;
  body: string;
  eventDate?: Date;
  lifeEventTag?: LifeEventTag;
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name?: string;
    image?: string;
  };
  images: {
    id: string;
    url: string;
    thumbnailUrl?: string;
    alt?: string;
    caption?: string;
    displayWidth?: string;
    displayHeight?: string;
    order: number;
  }[];
}

export interface PendingImage {
  id: string;
  file: File;
  preview: string;
  alt?: string;
  caption?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  image?: string;
  bio?: string;
  birthDate?: Date;
  createdAt: Date;
}

export interface FamilyMember {
  id: string;
  name?: string;
  image?: string;
  email: string;
  relationship?: string;
  storiesCount: number;
  isOwner?: boolean;
}

export interface FamilyMembershipRequest {
  id: string;
  status: FamilyMembershipStatus;
  createdAt: Date;
  requester: {
    id: string;
    name?: string;
    image?: string;
    email: string;
  };
  targetFamilyOwner: {
    id: string;
    name?: string;
    image?: string;
  };
}

export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T = any> {
  isSubmitting: boolean;
  errors: FormError[];
  data?: T;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "destructive";
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export interface UploadedFile {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
}

export interface SearchFilters {
  query?: string;
  lifeEventTag?: LifeEventTag;
  startDate?: Date;
  endDate?: Date;
  authorId?: string;
  visibility?: Visibility;
}

export interface TimelineGrouping {
  type: "year" | "month" | "event";
  items: StoryWithDetails[];
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export interface StoryEventHandlers {
  onEdit?: (storyId: string) => void;
  onDelete?: (storyId: string) => void;
  onShare?: (storyId: string) => void;
  onView?: (storyId: string) => void;
}

export interface FamilyEventHandlers {
  onInvite?: () => void;
  onMemberClick?: (memberId: string) => void;
  onRequestApprove?: (requestId: string) => void;
  onRequestReject?: (requestId: string) => void;
}

export interface DashboardStats {
  totalStories: number;
  totalImages: number;
  familyMembers: number;
  recentActivity: number;
}

export interface ActivityItem {
  id: string;
  type:
    | "story_created"
    | "story_updated"
    | "family_member_added"
    | "image_uploaded";
  message: string;
  timestamp: Date;
  userId?: string;
  storyId?: string;
}

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeConfig {
  mode: ThemeMode;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}
