import React from 'react';
import { Pagination as HeroPagination, PaginationItemType } from "@heroui/react";
import { cn } from '../../utils/cn';

export const ChevronIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M15.5 19l-7-7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
};

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    showInfo?: boolean;
    disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
    showInfo = true,
    disabled = false,
}) => {
    if (totalPages <= 1) return null;

    const renderItem = ({
        ref,
        key,
        value,
        isActive,
        onNext,
        onPrevious,
        setPage,
        className: itemClassName,
    }: any) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <button
                    key={key}
                    className={cn(
                        itemClassName,
                        "bg-default-200/50 min-w-8 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-default-300",
                        disabled && "opacity-50 cursor-not-allowed hover:bg-default-200/50"
                    )}
                    onClick={onNext}
                    disabled={disabled || currentPage === totalPages}
                    aria-label="Next page"
                >
                    <ChevronIcon className="rotate-180" />
                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button
                    key={key}
                    className={cn(
                        itemClassName,
                        "bg-default-200/50 min-w-8 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-default-300",
                        disabled && "opacity-50 cursor-not-allowed hover:bg-default-200/50"
                    )}
                    onClick={onPrevious}
                    disabled={disabled || currentPage === 1}
                    aria-label="Previous page"
                >
                    <ChevronIcon />
                </button>
            );
        }

        if (value === PaginationItemType.DOTS) {
            return (
                <button
                    key={key}
                    className={cn(
                        itemClassName,
                        "min-w-8 w-8 h-8 flex items-center justify-center text-default-400"
                    )}
                    disabled={disabled}
                >
                    ...
                </button>
            );
        }

        return (
            <button
                key={key}
                ref={ref}
                className={cn(
                    itemClassName,
                    "min-w-8 w-8 h-8 flex items-center justify-center rounded-full font-medium transition-all",
                    isActive
                        ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold shadow-md"
                        : "bg-default-200 hover:bg-default-300 text-default-700 hover:text-default-900",
                    disabled && "opacity-50 cursor-not-allowed hover:bg-default-200"
                )}
                onClick={() => !disabled && setPage(value)}
                disabled={disabled}
                aria-label={`Go to page ${value}`}
                aria-current={isActive ? 'page' : undefined}
            >
                {value}
            </button>
        );
    };

    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            <HeroPagination
                disableCursorAnimation
                showControls
                className="gap-2"
                page={currentPage}
                total={totalPages}
                variant="light"
                radius="full"
                renderItem={renderItem}
                onChange={onPageChange}
                isDisabled={disabled}
            />

            {/* {showInfo && (
                <div className="text-sm text-default-600 dark:text-default-400">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                </div>
            )} */}
        </div>
    );
};

export default Pagination;