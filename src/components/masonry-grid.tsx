"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Types
interface MasonryGridProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  columns?: number | { sm: number; md: number; lg: number; xl: number };
  gap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemId: (item: T) => string | number;
  getItemHeight?: (item: T) => number;
  animation?: boolean;
}

interface MasonryColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
}

interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  loaded?: boolean;
  animationDelay?: string;
  animation?: boolean;
}

// Root component
function MasonryGrid<T>({
  items,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className,
  renderItem,
  getItemId,
  getItemHeight,
  animation = true,
  ...props
}: MasonryGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) {
  const [columnCount, setColumnCount] = React.useState(3);
  const [itemHeights, setItemHeights] = React.useState<
    Record<string | number, number>
  >({});
  const [loadedItems, setLoadedItems] = React.useState<Set<string | number>>(
    new Set(),
  );
  const gridRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string | number, HTMLDivElement>>(
    new Map(),
  );
  const itemsRef = React.useRef<T[]>([]);

  // Store column assignments persistently across renders
  const columnAssignmentsRef = React.useRef<Map<string | number, number>>(
    new Map(),
  );

  // Store a reference to the current items to detect changes
  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Update column count based on screen size
  React.useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (typeof columns === "number") {
        setColumnCount(columns);
      } else {
        if (width < 640) setColumnCount(columns.sm);
        else if (width < 768) setColumnCount(columns.md);
        else if (width < 1024) setColumnCount(columns.lg);
        else setColumnCount(columns.xl);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [columns]);

  // Track item heights after they render
  React.useEffect(() => {
    const handleItemLoad = (id: string | number, element: HTMLDivElement) => {
      setItemHeights((prev) => ({
        ...prev,
        [id]: element.clientHeight,
      }));

      // Mark item as loaded
      setLoadedItems((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    };

    // Set up item load handlers
    itemRefs.current.forEach((item, id) => {
      if (item) {
        handleItemLoad(id, item);
      }
    });

    // Mark all items as loaded after a short delay
    const timer = setTimeout(() => {
      items.forEach((item) => {
        const id = getItemId(item);
        setLoadedItems((prev) => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [items, getItemId]);

  // Distribute items into columns using a stable algorithm
  const getColumns = React.useMemo(() => {
    const columnsArray: T[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array(columnCount).fill(0);

    // First pass: place items that already have column assignments
    const processedIds = new Set<string | number>();

    items.forEach((item) => {
      const id = getItemId(item);
      const existingColumnIndex = columnAssignmentsRef.current.get(id);

      if (
        existingColumnIndex !== undefined &&
        existingColumnIndex < columnCount
      ) {
        // Keep item in its existing column
        columnsArray[existingColumnIndex].push(item);
        const itemHeight =
          itemHeights[id] || (getItemHeight ? getItemHeight(item) : 300);
        columnHeights[existingColumnIndex] += itemHeight + gap;
        processedIds.add(id);
      }
    });

    // Second pass: place new items in the shortest columns
    items.forEach((item) => {
      const id = getItemId(item);
      if (!processedIds.has(id)) {
        // Find the shortest column for new items
        const shortestColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights),
        );
        columnsArray[shortestColumnIndex].push(item);

        // Store the column assignment for future renders
        columnAssignmentsRef.current.set(id, shortestColumnIndex);

        // Update column height
        const itemHeight =
          itemHeights[id] || (getItemHeight ? getItemHeight(item) : 300);
        columnHeights[shortestColumnIndex] += itemHeight + gap;
      }
    });

    return columnsArray;
  }, [items, columnCount, itemHeights, gap, getItemId, getItemHeight]);

  // Get appropriate grid template columns style based on column count
  const getGridStyle = () => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      gap: `${gap * 0.25}rem`,
    };
  };

  // Calculate animation delay based on position
  const getAnimationDelay = (columnIndex: number, itemIndex: number) => {
    return `${(columnIndex * 0.1 + itemIndex * 0.05).toFixed(2)}s`;
  };

  return (
    <div
      ref={gridRef}
      className={cn(className)}
      style={getGridStyle()}
      {...props}
    >
      {animation && (
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      )}
      {getColumns.map((column, columnIndex) => (
        <MasonryColumn key={`column-${columnIndex}`} gap={gap}>
          {column.map((item, itemIndex) => {
            const id = getItemId(item);
            return (
              <MasonryItem
                key={id}
                loaded={loadedItems.has(id)}
                animationDelay={
                  animation
                    ? getAnimationDelay(columnIndex, itemIndex)
                    : undefined
                }
                animation={animation}
              >
                {renderItem(item, items.indexOf(item))}
              </MasonryItem>
            );
          })}
        </MasonryColumn>
      ))}
    </div>
  );
}

// Column component
const MasonryColumn = React.forwardRef<HTMLDivElement, MasonryColumnProps>(
  ({ gap = 4, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${gap * 0.25}rem`,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
MasonryColumn.displayName = "MasonryColumn";

// Item component
const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  (
    {
      loaded = false,
      animationDelay,
      animation = true,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        opacity: loaded ? 1 : 0,
        animation: animation ? "fadeInUp 0.5s forwards" : undefined,
        animationDelay: animation ? animationDelay : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
MasonryItem.displayName = "MasonryItem";

export { MasonryGrid, MasonryColumn, MasonryItem };
