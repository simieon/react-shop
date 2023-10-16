package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.FileSystemStorageService;
import shop.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImplement implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;

    @Override
    public CategoryItemDTO create(CreateCategoryDTO model) {
        var filename = storageService.saveMultipartFile(model.getFile());
        CategoryEntity category = categoryMapper.categoryByCategoryCreateDTO(model);

        category.setImage(filename);
        categoryRepository.save(category);
        var result = categoryMapper.CategoryItemDTOByCategory(category);
        return result;
    }

    @Override
    public List<CategoryItemDTO> get() {
        var list = categoryRepository.findAll();
        return categoryMapper.CategoryItemDTOsByCategories(list);
    }

    @Override
    public CategoryItemDTO update(int id, CreateCategoryDTO model) {
        var catOptional = categoryRepository.findById(id);
        if(catOptional.isPresent())
        {
            var cat = catOptional.get();
            cat.setName(model.getName());
            storageService.removeFile(cat.getImage());
            var filename = storageService.save("");
            cat.setImage(filename);

            cat.setDescription((model.getDescription()));
            categoryRepository.save(cat);

            var result = categoryMapper.CategoryItemDTOByCategory(cat);
            return result;
        }
        return null;
    }

    @Override
    public void delete(int id) {
        CategoryEntity category = categoryRepository.findById(id).get();
        storageService.removeFile(category.getImage());
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryItemDTO get(int id) {
        var catOptional = categoryRepository.findById(id);
        if(catOptional.isPresent())
        {
            return categoryMapper.CategoryItemDTOByCategory(catOptional.get());
        }
        return null;
    }
}
