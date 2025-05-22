import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiShoppingBag,
  FiXCircle,
  FiArrowUp,
  FiArrowDown,
  FiX,
} from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// 商品データの型定義
type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
};

export function ProductLinkStep() {
  const { register, setValue, watch } = useFormContext();
  const selectedProductIds = watch("productIds") || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // 商品検索処理
  const searchProducts = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      // APIリクエストはここで実装
      // この例ではダミーデータを使用
      // const response = await fetch(`/api/products/search?q=${searchTerm}`);
      // const data = await response.json();

      // ダミーデータ
      const dummyResults: Product[] = [
        {
          id: "prod_1",
          name: "信州産 りんご (サンふじ) 5kg",
          price: 4500,
          images: ["/images/dummy/apple.jpg"],
          category: "果物",
        },
        {
          id: "prod_2",
          name: "手作り りんごジャム 200g",
          price: 1200,
          images: ["/images/dummy/apple-jam.jpg"],
          category: "加工食品",
        },
        {
          id: "prod_3",
          name: "山形産 さくらんぼ (佐藤錦) 500g",
          price: 3800,
          images: ["/images/dummy/cherry.jpg"],
          category: "果物",
        },
      ];

      // 検索結果から既に選択済みの商品を除外
      const filteredResults = dummyResults.filter(
        (prod) => !selectedProductIds.includes(prod.id),
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("商品検索エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 商品選択処理
  const addProduct = (product: Product) => {
    const newProductIds = [...selectedProductIds, product.id];
    setValue("productIds", newProductIds);
    setSelectedProducts((prev) => [...prev, product]);
    setSearchResults((prev) => prev.filter((p) => p.id !== product.id));
  };

  // 商品削除処理
  const removeProduct = (productId: string) => {
    const newProductIds = selectedProductIds.filter(
      (id: string) => id !== productId,
    );
    setValue("productIds", newProductIds);

    const removedProduct = selectedProducts.find(
      (p: Product) => p.id === productId,
    );
    if (removedProduct) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));

      // 検索結果に戻す（検索条件に合致する場合）
      if (
        removedProduct.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        setSearchResults((prev) => [...prev, removedProduct]);
      }
    }
  };

  // 選択済み商品の並べ替え処理
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedProducts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem as Product);

    setSelectedProducts(items);
    setValue(
      "productIds",
      items.map((item) => item.id),
    );
  };

  // 商品を上下に移動
  const moveProduct = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= selectedProducts.length) return;

    const newSelectedProducts = [...selectedProducts];
    const temp = newSelectedProducts[index];
    newSelectedProducts[index] = newSelectedProducts[newIndex] as Product;
    newSelectedProducts[newIndex] = temp as Product;

    setSelectedProducts(newSelectedProducts);
    setValue(
      "productIds",
      newSelectedProducts.map((item) => item.id),
    );
  };

  // 初期化時に選択済み商品情報を取得
  useEffect(() => {
    const fetchSelectedProducts = async () => {
      if (selectedProductIds.length === 0) return;

      // APIリクエストはここで実装
      // この例ではダミーデータを使用
      // const response = await fetch(`/api/products?ids=${selectedProductIds.join(",")}`);
      // const data = await response.json();

      // ダミーデータ
      const dummyProducts = [
        {
          id: "prod_1",
          name: "信州産 りんご (サンふじ) 5kg",
          price: 4500,
          images: ["/images/dummy/apple.jpg"],
          category: "果物",
        },
        {
          id: "prod_2",
          name: "手作り りんごジャム 200g",
          price: 1200,
          images: ["/images/dummy/apple-jam.jpg"],
          category: "加工食品",
        },
      ];

      // 選択済みIDに該当する商品情報だけを抽出
      const matchingProducts = dummyProducts.filter((prod) =>
        selectedProductIds.includes(prod.id),
      );

      // IDの順序と同じ順序で商品を並べる
      const orderedProducts = selectedProductIds
        .map((id: string) => matchingProducts.find((prod) => prod.id === id))
        .filter(Boolean) as Product[];

      setSelectedProducts(orderedProducts);
    };

    fetchSelectedProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-700">
        <p>
          配信で紹介する商品を追加しましょう。順番はドラッグで変更できます。
        </p>
      </div>

      {/* 商品検索 */}
      <div className="space-y-3">
        <Label htmlFor="productSearch">商品を検索</Label>
        <div className="flex gap-2">
          <Input
            id="productSearch"
            placeholder="商品名を入力"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={searchProducts}
            disabled={!searchTerm || isLoading}
            className="flex items-center"
          >
            <FiSearch className="mr-2 h-4 w-4" />
            検索
          </Button>
        </div>
      </div>

      {/* 検索結果 */}
      {searchResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            検索結果 ({searchResults.length}件)
          </h3>
          <div className="max-h-60 space-y-2 overflow-y-auto">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-3"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <FiShoppingBag className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      ¥{product.price.toLocaleString()} / {product.category}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => addProduct(product)}
                  size="sm"
                  className="flex h-8 items-center"
                >
                  <FiPlus className="mr-1 h-3 w-3" />
                  追加
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 選択済み商品 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>選択済み商品 ({selectedProducts.length})</Label>
          {selectedProducts.length > 0 && (
            <span className="text-xs text-gray-500">
              ドラッグで順序を変更できます
            </span>
          )}
        </div>

        {selectedProducts.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
            <p className="text-sm text-gray-500">
              配信で紹介する商品を追加してください
            </p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="selected-products">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {selectedProducts.map((product, index) => (
                    <Draggable
                      key={product.id}
                      draggableId={product.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3"
                        >
                          <div className="flex items-center">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">
                              {index + 1}
                            </div>
                            <div className="mx-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              {product.images.length > 0 ? (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                  <FiShoppingBag className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ¥{product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={() => moveProduct(index, "up")}
                              disabled={index === 0}
                              className={`rounded p-1 hover:bg-gray-100 ${
                                index === 0 ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              <FiArrowUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveProduct(index, "down")}
                              disabled={index === selectedProducts.length - 1}
                              className={`rounded p-1 hover:bg-gray-100 ${
                                index === selectedProducts.length - 1
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            >
                              <FiArrowDown className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeProduct(product.id)}
                              className="rounded p-1 text-red-500 hover:bg-red-50"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
