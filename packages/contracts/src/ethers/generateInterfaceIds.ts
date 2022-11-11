import { FormatTypes } from '@ethersproject/abi';
import { writeFileSync } from 'fs';
import { interfaces } from './interfaces.js';

export function generateInterfaceIds() {
    Object.entries(interfaces).forEach(([name, value]) => {
        const abi = value.interface.format(FormatTypes.json) as any;
        generateInterfaceId(value.interfaceId, name, JSON.parse(abi));
    });

    const interfaceIds = Object.values(interfaces).map(({ interfaceId }) => interfaceId);
    writeFileSync('./interfaceId/index', JSON.stringify({ result: interfaceIds }));
}

export function generateInterfaceId(interfaceId: string, name: string, abi: any[]) {
    writeFileSync(`./interfaceId/${interfaceId}`, JSON.stringify({ name, interfaceId, abi }));
}

generateInterfaceIds();
