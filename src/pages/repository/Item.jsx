import React, {useRef} from 'react'
import Api from '../../services/api'

const Item = ({ item }) => {

    const itemRef = useRef(item)

    if (item === undefined)
        return null

    

    const handleRemoveRepository = async (id) => {
        Api.delete(`/repositories/${id}`)
        .then(status => {
            itemRef.current.remove()
        })
        .catch(err => {
            alert(`Error on delete repository`)
        })
    }

    return (
        <li ref={itemRef}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
            </button>
        </li>
    )
}

export default Item

