import React, { Component} from 'react'
import {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Content from 'components/Content'
import FileList from 'components/FileList'
import Button from 'components/Button'
import Toggler from 'components/Toggler'
import IconPlus from 'components/icons/IconPlus'
import SearchBar from 'components/SearchBar'
import NewFileForm from './NewFileForm'




const StyledContainer = styled.div``

export const Title = styled.h1`
  margin-bottom: 20px;
`



class AllFilesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredList : this.props.files
    }
    
  }
  //all with matching file ext
  sameFileType(list,fileType){
    let result = []
    for (let i in list){
      if (list[i].includes(fileType)){
        result.push(list[i].replace(/\.[^/.]+$/, ""))
      }
    }
    return result
  }

  // checks for filename duplications and iterations
  fileDetection (name) {

    const fileNames = this.props.files.map(file =>(file.filename))            //get filename

    const re = /(?:\.([^.]+))?$/
    const fileType = re.exec(name)[1]                                         // get filetype 
    const arr = this.sameFileType(fileNames,re.exec(name)[1])                 // file ext match cases, if does not match, must be a different files so has its on dedicated incrementation
    
    name = name.replace(/\.[^/.]+$/, "")                                      //filename of new file 
    
    let counter = 1                                                           //iterator
    let firstName = name         

    while (arr.includes(firstName)){                                                //if the iteration exist, continue
      firstName = name.replace(/\.[^/.]+$/, "") + "(" + String(counter) + ")" 
      counter += 1
    }

    return firstName + "." +fileType                            


  }


  ///updates files list if matches search bar input
  updateFilterList = (event)=> {
      const filterList = this.props.files.filter((file =>                           //removes case sensitivity. Filters by filename and description
        file.filename.toLowerCase().includes(event.target.value.toLowerCase()) || 
        file.description.toLowerCase().includes(event.target.value.toLowerCase()) 
        ))
      this.setState({ filteredList: filterList })

  }


  handleAddFile = (data) => {
    const { addFile } = this.props

    /// runs if file was uploaded
    if (typeof data.file !== 'undefined') {
      data.file.name = this.fileDetection(data.file.name) //runs filename De-duplication 
      return addFile(data)
    }

  
  }

  renderFiles () {
    const { files } = this.props
    //console.log(files)
    return (
      
      <Content.Card>
        
        <FileList
          files={this.state.filteredList}    
        />

      </Content.Card>
    )
  }

  //create search bar
  searchBar (){
    return (
        <Content.Search>
        <SearchBar updateFilterList = {this.updateFilterList} />  
        </Content.Search>
    )
  }


  renderNewFileForm () {

    return (
      <Toggler
        renderButton={({ showItem, onClick }) => (
          <Button type="link" onClick={onClick}>
            <IconPlus />
            <span>{showItem ? 'Close Add Form' : 'Add a File'}</span>
          </Button>
        )}
      >

        {() => (
          <NewFileForm onSubmit={this.handleAddFile} />
        )}
      </Toggler>
      
    )
  }

  render () {
    const { username } = this.props
    return (
      <StyledContainer>
        <Title>{`Hi ${username} 👋`}</Title>
        {this.searchBar()} 
        {this.renderFiles()}
        {this.renderNewFileForm()}
        
      </StyledContainer>
    )
  }
}

AllFilesView.propTypes = {
  addFile: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
}

export default AllFilesView
