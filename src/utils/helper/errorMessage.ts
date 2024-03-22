export function getErrorMessage(error: unknown): { status: number; body: { message: string } } {
    if (error instanceof Error) {
        return { status: 500, body: { message: error.message } };
    } else {
        return { status: 500, body: { message: 'An unknown error occurred' } };
    }
}
