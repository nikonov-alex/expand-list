export type State<I> = {
    expanded: boolean,
    value: I
}

export const getValue = <I,>( state: State<I> ): I =>
    state.value;

export const toggle = <I,>( state: State<I> ): State<I> =>
    ( { ... state, expanded: !state.expanded } );




export const render = <I,>( state: State<I>, options: {
    displayHeader: { ( item: I ): HTMLElement },
    displayBody: { (item: I): HTMLElement }
    classes?: {
        header?: string,
        body?: string
    }
} ): HTMLElement =>
    <div className="expand">
        <div className={ "item-header " + ( options.classes?.header ? options.classes?.header : "" ) }>
            { options.displayHeader( state.value ) }
        </div>
        { state.expanded
            ? <div className={ "item-body " + ( options.classes?.body ? options.classes?.body : "" ) }>
                { options.displayBody( state.value ) }
            </div>
            : null
        }
    </div> as HTMLElement;




type InsideHeader = HTMLElement & { InsideHeader: null }
export type HeaderClickEvent = Event & { target: InsideHeader };

export const isHeaderClick = ( event: Event ): event is HeaderClickEvent =>
    (event.target as HTMLElement).matches( ".item-header, .item-header *" );





export const headerClick = <I,>( state: State<I>, event: HeaderClickEvent ): State<I> =>
    toggle( state );

export const onClick = <I,>( state: State<I>, event: Event ): State<I> =>
    isHeaderClick( event )
        ? headerClick( state, event )
        : state




export const make = <I,>( value: I ): State<I> =>
    ( {
        expanded: false,
        value
    } );