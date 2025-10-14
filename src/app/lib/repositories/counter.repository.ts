import { Counter } from '@/schemas/counter.schema';
import { prisma } from '@/db';

export class CounterRepository {
    async findById(counterId: number): Promise<Counter | null> {
        try {
            const counter = await prisma.counter.findUnique({
                where: { id: BigInt(counterId) }
            });

            if (!counter) {
                return null;
            }

            return {
                id: Number(counter.id),
            };
        } catch (error) {
            throw new Error('Failed to fetch counter from database');
        }
    }
}