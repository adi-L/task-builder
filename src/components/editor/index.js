import React from 'react';
import Text from '../text'
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from 'uuid';



const Editor = () => {

    const renderSkeleton = (props) => {
        const render = () => {
            return props.children.map((_skeletonProps) => {
                if (typeof _skeletonProps === "string") return _skeletonProps;
                const Component = _skeletonProps.Component;
                const innerProps = {
                    style: _skeletonProps.style,
                    className: _skeletonProps.classList.join(" "),
                    key: _skeletonProps.key,
                    id: _skeletonProps.id
                }

                return <Component {...innerProps}>{renderSkeleton(_skeletonProps)}</Component>
            })
        }
        return render();

    }
    function Skeleton(props) {
        const { style = {}, classList = [], children = [], type = "container", isSortable = false } = props;
        this.id = this.key = `bolder-${uuidv4()}`;
        this.style = style;
        this.isSortable = isSortable;
        this.classList = classList;
        this.type = type;
        this.children = children;
        this.onChange = () => {

        }
        this.ref = window[this.type] = React.createRef();
        const That = (initProps) => {
            console.log("rnedring..",initProps.children)
            const [childs, setChilds] = React.useState(initProps.children);

            switch (this.type) {
                case "container":
                    if (this.isSortable) {
                        return <ReactSortable list={childs} setList={setChilds}>{childs}</ReactSortable>
                    }
                    return <div  {...initProps}>{initProps.children}</div>
                case "text":
                    return <Text ref={this.ref} {...initProps}>{childs}</Text>
                default:
                    break;
            }

        }
        this.Component = That;
    }
    const fromServer = {
        name: "",
        children: [
            new Skeleton({
                isSortable: false,
                children: [
                    new Skeleton({ children: [new Skeleton({ type: "text", children: ["im", "from", "text component"] })] }),
                    new Skeleton({ children: [new Skeleton({ type: "text", children: ["im", "from", "text component 2"] })] }),
                ]
            })
        ]
    }

    const [page, setPage] = React.useState(fromServer);

    return <div>
        {renderSkeleton(page)}
    </div>
}
export default Editor;