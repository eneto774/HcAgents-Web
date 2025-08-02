export const formatDate = (date: Date | string | undefined) => {
    if (!date) return ''

    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date
        if (isNaN(dateObj.getTime())) return ''

        return dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    } catch {
        return ''
    }
}