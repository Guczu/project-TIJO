import addCartQuantity from "../addCartQuantity";

const mockProduct = null;

test('addCartQuantity returns empty array when product is null', () => {
    const result = addCartQuantity(mockProduct);

    expect(result).toEqual([]);
})