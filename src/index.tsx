import * as List  from "@nikonov-alex/sortable-list";
import { Constructs, Types } from "@nikonov-alex/functional-library";
const local = Constructs.local;


type Item<I> = {
    expanded: boolean,
    value: I
}

type State<I> = List.State<Item<I>>;

const makeItem = <I,>( value: I ): Item<I> =>
    ( {
        expanded: false,
        value
    } );

const addItem = <I,>( state: State<I>, item: I ): State<I> =>
    List.addItem( state, makeItem( item ) );

const toggleItem = <I,>( state: State<I>, index: number ): Types.Maybe<State<I>> =>
    !state[index]
        ? false
    : state.map( (item, currentIndex) =>
        currentIndex === index
            ? { expanded: !item.expanded, value: item.value }
        : item
    );




const makeRender = <I,>( options: {
    displayHeader: { ( item: I, buttons: HTMLElement ): HTMLElement },
    displayBody: { (item: I): HTMLElement }
} ): { (s: State<I>): HTMLElement } =>
    List.makeRender(
        ( item: Item<I>, buttons: HTMLElement ) =>
            <div className="expand-item">
                <div className="item-header">
                    { options.displayHeader( item.value, buttons ) }
                </div>
                { item.expanded
                    ? <div className="item-body">
                        { options.displayBody( item.value ) }
                    </div>
                    : null
                }
            </div> as HTMLElement
    );




type InsideHeader = List.InsideItem & { InsideHeader: null }
type HeaderClickEvent = Event & { target: InsideHeader };

const isHeaderClick = ( event: Event ): event is HeaderClickEvent =>
    (event.target as HTMLElement).matches( ".item-header, .item-header *" );




const headerClicked = <I,>( state: State<I>, event: HeaderClickEvent ): State<I> =>
    List.isItemAction( event )
        ? List.itemAction( state, event )
        : toggleItem( state, List.getIndex( List.getItem( event.target )) ) || alert( "Item does not exist" ) || state

const maybeItemClicked = <I,>( state: State<I>, event: Event ): State<I> =>
    isHeaderClick( event )
        ? headerClicked( state, event )
        : state




const make = <I,>( items: I[] ): State<I> =>
    items.map( item => ( {
        expanded: false,
        value: item
    } ) );


export { makeRender, State, make, Item, makeItem, addItem, maybeItemClicked, isHeaderClick, headerClicked };