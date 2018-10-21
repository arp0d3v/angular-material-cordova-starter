export class ListItemDto {
    ItemID: number;
    ItemValue: any;
    ItemText: string;
    Selected: boolean;
    SubItems: ListItemDto[];
}
