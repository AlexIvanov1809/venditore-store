import { IProductType } from "@/types/productType";
import { DeleteFn, HideFn } from "@/types/uiTypes";

export default interface EntityEditorProps {
  label: string;
  onHide: HideFn;
  onDelete: DeleteFn;
  item: IProductType | null;
  endpoint: string;
}
