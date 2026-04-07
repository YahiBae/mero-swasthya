import { Search, MapPin, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  locationFilter: string;
  onLocationChange: (val: string) => void;
  locations: string[];
  extraFilterLabel?: string;
  extraFilterValue?: string;
  onExtraFilterChange?: (val: string) => void;
  extraFilterOptions?: string[];
  resultCount: number;
}

const ListingFilters = ({
  searchQuery, onSearchChange, searchPlaceholder = "Search...",
  locationFilter, onLocationChange, locations,
  extraFilterLabel, extraFilterValue, onExtraFilterChange, extraFilterOptions,
  resultCount,
}: ListingFiltersProps) => {
  const hasFilters = searchQuery || locationFilter || (extraFilterValue && extraFilterValue !== "");

  return (
    <div className="card-shadow rounded-2xl bg-card p-4 md:p-6 mb-8">
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 md:col-span-1 lg:col-span-2">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground outline-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {extraFilterOptions && onExtraFilterChange && (
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={extraFilterValue}
              onChange={(e) => onExtraFilterChange(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none cursor-pointer"
            >
              <option value="">All {extraFilterLabel}</option>
              {extraFilterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultCount}</span> results
        </p>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => {
              onSearchChange("");
              onLocationChange("");
              onExtraFilterChange?.("");
            }}
          >
            <X className="h-3 w-3" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingFilters;
