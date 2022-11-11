export interface JSONEncodable {
    [key: string]: string | number | string[] | number[] | JSONEncodable | JSONEncodable[];
}
