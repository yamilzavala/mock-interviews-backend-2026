async function create(submission) {
    const result = await db.query(
        `
            INSERT INTO from_submissions
            (
                id,
                created_at,
                data
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
        `,
        [
            submission.id,
            submission.createdAt,
            JSON.stringify(submission.data)
        ]
    )

    return result.rows[0];
}