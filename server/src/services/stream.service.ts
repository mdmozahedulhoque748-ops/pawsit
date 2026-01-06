import { StreamChat } from 'stream-chat';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.warn("STREAM_API_KEY or STREAM_API_SECRET is not set. Chat features will not work.");
}

const serverClient = StreamChat.getInstance(apiKey || '', apiSecret || '');

export const streamService = {
    createToken: (userId: string) => {
        return serverClient.createToken(userId);
    },

    createChannel: async (bookingId: number, memberIds: string[]) => {
        // Ensure all members exist as Stream users first
        await Promise.all(memberIds.map(id => 
            serverClient.upsertUser({ id, name: id })
        ));
        
        const channel = serverClient.channel('messaging', `booking_${bookingId}`, {
            name: `Booking #${bookingId}`,
            members: memberIds,
            created_by_id: memberIds[0],
        } as any);
        await channel.create();
        return channel;
    },

    getOrCreateChannel: async (bookingId: number, memberIds: string[]) => {
        const channelId = `booking_${bookingId}`;
        
        // Ensure all members exist as Stream users first
        await Promise.all(memberIds.map(id => 
            serverClient.upsertUser({ id, name: id })
        ));
        
        // Always create with members - Stream's create() is idempotent
        // If channel exists, it will update members. If not, it will create it.
        const channel = serverClient.channel('messaging', channelId, {
            name: `Booking #${bookingId}`,
            members: memberIds,
            created_by_id: memberIds[0],
        } as any);
        await channel.create();
        return channel;
    },

    syncUser: async (userId: string, data: { name: string; image?: string }) => {
        await serverClient.upsertUser({
            id: userId,
            name: data.name,
            image: data.image,
        });
    },

    deleteChannel: async (bookingId: number) => {
        const channel = serverClient.channel('messaging', `booking_${bookingId}`);
        await channel.delete();
    }
};
