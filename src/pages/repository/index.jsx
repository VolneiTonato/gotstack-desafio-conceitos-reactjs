import React, { useState, useEffect, Fragment } from 'react'
import Item from './Item'
import Api from '../../services/api' 

const PageRepository = () => {

    const [data, setData] = useState({
        title: '',
        url: '',
        techs: []
    })
    const [loading, setLoading] = useState(false)
    const [error, setError]  = useState(false)
    const [readOnlySave, setReadOnlySave] = useState(false)
    const [repositories, setRepositores] = useState([])

    const handleOnchageInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        
        setData(field => { return { ...field, [`${name}`]: value } })
    }


    const handleAddRepository = async (e) =>  {
        e.preventDefault()

        setReadOnlySave(true)

        Api.post('/repositories', data)
        .then(response => {

            setData(field => {return {...field, title: '', url:'', techs:[]}})

            setRepositores(repository => [...repository, response.data])
        })
        .catch(err => {
            alert(err)
        })
        .finally(onFinally => {
            setReadOnlySave(false)
        })

    }


    const listRepositores = async () => {

        setLoading(true)

        

        Api.get('/repositories')
        .then(repositories => {
            setRepositores(repositories.data)
        }).catch(err => {
            setError(true)
        }).finally(onFinally =>{
            setLoading(false)
        })

    }

    useEffect(() => {
        listRepositores()
        
    }, [])

    return (

        <Fragment>

            

            <form onSubmit={handleAddRepository} autoComplete="off">
                <fieldset>

                    <legend>Repositories</legend>

                    <div className="row">
                        <label>Title:</label>
                        <input value={data.title} onChange={handleOnchageInput} required name="title" type="text" />
                    </div>

                    <div className="row">
                        <label>url:</label>
                        <input value={data.url} onChange={handleOnchageInput} required name="url" type="url" />
                    </div>

                    <div className="row">
                        <label>Techs:</label>
                        <input value={data.techs} onChange={handleOnchageInput} required name="techs" type="text" />
                    </div>
                </fieldset>

                <button  disabled={readOnlySave} type="submit">Adicionar</button>
            </form>


            <div className="items">
                <ul data-testid="repository-list">
                    {repositories.map(row => 
                        <Item  key={row.id} item={row} />    
                    )}
                </ul>
            </div>


          {loading && <p>loading...</p>}
          {error && <p>Error in repositories</p>}



        </Fragment>
    )
}

export default PageRepository