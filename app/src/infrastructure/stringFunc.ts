/**
 * Проверяет строку на пустоту
 * @param value Строка
 */
export function isNullOrEmpty(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0;
}