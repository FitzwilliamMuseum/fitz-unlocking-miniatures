
type MiniatureItemInterface = {
    id: string | null;
    title: string | null;
    artist_text: string | null;
    sitter_text: string | null;
    image_normal_light: string | null;
    image_alt: string | null;
    iiif_manifest_new: string | null;
}

type MiniatureItemProps = {
    item: MiniatureItemInterface;
    result: Index.Result | null;
    onClickCompare: VoidFunction;
    compareActive: boolean;
}

type MiniatureItemWithSearchResultInterface = {
    item: MiniatureItemInterface
    result: Index.Result | null
}