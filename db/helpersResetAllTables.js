import { resetBootcampersTable } from './helpersBootcampers';
import { resetCommentsTable } from './helpersComments';
import { resetPostsTable } from './helpersPosts';

export async function resetAllTables() {
    await resetBootcampersTable();
    await resetPostsTable();
    await resetCommentsTable();
}

export default resetAllTables