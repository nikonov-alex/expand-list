import * as List from "@nikonov-alex/sortable-list";
import * as Expand from "@nikonov-alex/expand";
import { Constructs } from "@nikonov-alex/functional-library";
const local = Constructs.local;



export type State<I> = List.State<Expand.State<I>>;




export const toggleItem = <I,>( state: State<I>, event: List.ItemEvent & Expand.HeaderClickEvent ): State<I> =>
    local( List.getIndex( List.getItemElem( event.target ) ), index =>
        List.updateItem(
            state,
            index,
            Expand.toggle(
                List.getItem( state, index ))));

export const itemEvent = <I,>( state: State<I>, event: List.ItemEvent, options?: {
    isToggleAllowed?: { (state: State<I>, event: List.ItemEvent & Expand.HeaderClickEvent): boolean }
} ): State<I> =>
    List.isItemAction( event )
        ? List.itemAction( state, event )
        : Expand.isHeaderClick( event )
            ? !!options?.isToggleAllowed
                ? options.isToggleAllowed( state, event )
                    ? toggleItem( state, event )
                    : state
                : toggleItem( state, event )
            : state;