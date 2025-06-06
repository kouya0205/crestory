import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

// DBスキーマのLifeEventTagに対応
const LIFE_EVENT_OPTIONS = [
  { value: "BIRTH", label: "誕生" },
  { value: "CHILDHOOD", label: "幼少期" },
  { value: "STUDENT_DAYS", label: "学生時代" },
  { value: "FIRST_JOB", label: "初就職" },
  { value: "CAREER_CHANGE", label: "転職" },
  { value: "MARRIAGE", label: "結婚" },
  { value: "CHILDBIRTH", label: "出産" },
  { value: "PARENTING", label: "子育て" },
  { value: "HOBBY", label: "趣味" },
  { value: "TRAVEL", label: "旅行" },
  { value: "TURNING_POINT", label: "人生の転機" },
  { value: "HEALTH", label: "健康" },
  { value: "OTHER", label: "その他" },
] as const;

export type LifeEventTag = (typeof LIFE_EVENT_OPTIONS)[number]["value"];

interface LifeEventSelectorProps {
  value?: LifeEventTag;
  onValueChange: (value: LifeEventTag | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function LifeEventSelector({
  value,
  onValueChange,
  placeholder = "ライフイベントを選択",
  disabled = false,
  className,
}: LifeEventSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = LIFE_EVENT_OPTIONS.find(
    (option) => option.value === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[280px] justify-between", className)}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <div className="max-h-60 overflow-auto">
          {LIFE_EVENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm",
                "flex items-center gap-2",
                value === option.value && "bg-accent text-accent-foreground",
              )}
              onClick={() => {
                const selectedValue =
                  option.value === value ? undefined : option.value;
                onValueChange(selectedValue);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0",
                )}
              />
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
