export const systemLogs = async (author, action) =>{

    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${author} performed action: ${action}\n`;

    const query = `INSERT INTO system_logs (author, action) VALUES ($1, $2,)`;
    const values = [author, action];
    const result = await dbPool.query(query, values);
    return result.rows[0];
}