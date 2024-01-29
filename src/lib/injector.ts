import type { BaseRepository } from ".";

export class InjectBaseRepository {
  constructor(protected readonly repository: BaseRepository) {}
}
